import { NextResponse } from 'next/server';
import { getClient } from '@/lib/db';

export async function GET() {
  const client = await getClient().connect();
  try {
    // 1. Create Customers table
    await client.query(`
      CREATE TABLE IF NOT EXISTS customers (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        phone VARCHAR(20),
        total_debt DECIMAL(12, 2) DEFAULT 0,
        share_token VARCHAR(64) UNIQUE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 2. Create / Migrate Categories table
    await client.query(`
      CREATE TABLE IF NOT EXISTS categories (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        type VARCHAR(50),
        icon VARCHAR(20) DEFAULT '💳'
      );
    `);

    // Migration safe steps for categories
    try {
      await client.query(`ALTER TABLE categories DROP CONSTRAINT IF EXISTS categories_type_check;`);
    } catch (e) {
      // ignore
    }
    try {
      await client.query(`ALTER TABLE categories ALTER COLUMN type DROP NOT NULL;`);
    } catch (e) {
      // ignore
    }
    try {
      await client.query(`ALTER TABLE categories ADD COLUMN IF NOT EXISTS icon VARCHAR(20) DEFAULT '💳';`);
    } catch (e) {
      // ignore
    }

    // Insert default financial categories if table is empty, or update legacy food/drink categories
    const catCheck = await client.query(`SELECT COUNT(*) FROM categories;`);
    if (parseInt(catCheck.rows[0].count) === 0) {
      await client.query(`
        INSERT INTO categories (name, type, icon) VALUES 
          ('Đáo hạn thẻ tín dụng', 'finance', '💳'),
          ('Rút tiền mặt POS', 'finance', '🏧'),
          ('Lãi & Phí dịch vụ', 'finance', '📈'),
          ('Khoản vay gốc', 'finance', '💵');
      `);
    } else {
      // Update legacy names if they still exist
      await client.query(`
        UPDATE categories SET name = 'Đáo hạn thẻ tín dụng', icon = '💳' WHERE name = 'Đồ uống';
      `);
      await client.query(`
        UPDATE categories SET name = 'Rút tiền mặt POS', icon = '🏧' WHERE name = 'Đồ ăn';
      `);
    }

    // 3. Create Products table
    await client.query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
        name VARCHAR(255) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        active BOOLEAN DEFAULT TRUE
      );
    `);

    // 4. Create Transactions table
    await client.query(`
      CREATE TABLE IF NOT EXISTS transactions (
        id SERIAL PRIMARY KEY,
        customer_id INTEGER NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
        product_id INTEGER REFERENCES products(id) ON DELETE SET NULL,
        amount DECIMAL(12, 2) NOT NULL,
        type VARCHAR(20) NOT NULL CHECK (type IN ('debt', 'payment')),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    
    // Safe index creation
    try {
      await client.query(`CREATE INDEX IF NOT EXISTS idx_transactions_customer_id ON transactions(customer_id);`);
    } catch (e) {
      // ignore if index already exists
    }

    // 5. Create Payment Tickets table
    await client.query(`
      CREATE TABLE IF NOT EXISTS payment_tickets (
        id SERIAL PRIMARY KEY,
        customer_id INTEGER NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
        amount DECIMAL(12, 2) NOT NULL,
        note TEXT,
        status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        resolved_at TIMESTAMP WITH TIME ZONE
      );
    `);

    try {
      await client.query(`CREATE INDEX IF NOT EXISTS idx_payment_tickets_status ON payment_tickets(status);`);
    } catch (e) {
      // ignore if exists
    }
    try {
      await client.query(`CREATE INDEX IF NOT EXISTS idx_payment_tickets_customer ON payment_tickets(customer_id);`);
    } catch (e) {
      // ignore if exists
    }

    return NextResponse.json({ message: 'Database initialized successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error initializing database:', error);
    return NextResponse.json({ error: 'Failed to initialize database' }, { status: 500 });
  } finally {
    client.release();
  }
}
