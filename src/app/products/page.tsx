import { getProducts, getCategories } from '@/lib/db';
import { addProduct } from '@/lib/actions';
import ProductList from '@/components/ProductList';

export const instant = false;

export default async function ProductsPage() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories()
  ]);

  return (
    <div className="page-wrap">
      <h2 className="page-title">Dịch vụ & Biểu phí</h2>
      
      {/* Form thêm dịch vụ / khoản phí mới */}
      <div className="card" style={{ padding: '16px', borderRadius: '18px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700, margin: 0, color: '#111827' }}>
            Thêm gói dịch vụ / khoản phí mới
          </h3>
        </div>

        <form action={addProduct}>
          <div className="input-group">
            <label>Tên dịch vụ / khoản phí</label>
            <input 
              type="text" 
              name="name" 
              className="input" 
              placeholder="VD: Đáo hạn thẻ Techcombank, Phí rút tiền mặt POS 1.8%..." 
              required 
            />
          </div>
          <div className="input-group">
            <label>Giá tiền / Định mức (VND)</label>
            <input 
              type="number" 
              name="price" 
              className="input" 
              placeholder="VD: 500000" 
              required 
            />
          </div>
          <div className="input-group">
            <label>Phân loại</label>
            <select name="categoryId" className="input" defaultValue={categories[0]?.id || ''}>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.icon || '💳'} {cat.name}
                </option>
              ))}
              <option value="">Chưa phân loại</option>
            </select>
          </div>
          <button type="submit" className="btn">Thêm Dịch Vụ</button>
        </form>
      </div>

      {/* Danh sách dịch vụ & Bộ lọc / Quản lý nhóm */}
      <ProductList products={products} categories={categories} />
    </div>
  );
}
