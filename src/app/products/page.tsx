import { getProducts } from '@/lib/db';
import { addProduct } from '@/lib/actions';
import ProductList from '@/components/ProductList';

export const instant = false;

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="page-wrap">
      <h2 className="page-title">Dịch vụ</h2>
      
      {/* Form thêm món mới */}
      <div className="card" style={{ padding: '16px', borderRadius: '18px' }}>
        <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '12px', color: '#111827' }}>
          Thêm gói dịch vụ / khoản phí
        </h3>
        <form action={addProduct}>
          <div className="input-group">
            <label>Tên dịch vụ</label>
            <input type="text" name="name" className="input" placeholder="VD: Phở bò, Cà phê sữa..." required />
          </div>
          <div className="input-group">
            <label>Giá tiền (VND)</label>
            <input type="number" name="price" className="input" placeholder="35000" required />
          </div>
          <div className="input-group">
            <label>Phân loại</label>
            <select name="categoryId" className="input" required defaultValue="1">
              <option value="1">Đồ uống (Drink)</option>
              <option value="2">Đồ ăn (Food)</option>
            </select>
          </div>
          <button type="submit" className="btn">Thêm Dịch Vụ</button>
        </form>
      </div>

      {/* Danh sách món đồng bộ phong cách với danh sách khách */}
      <ProductList products={products} />
    </div>
  );
}
