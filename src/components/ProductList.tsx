'use client';

import { useState } from 'react';
import { Product, Category } from '@/lib/types';
import { 
  updateProductAction, 
  deleteProductAction, 
  addCategoryAction, 
  updateCategoryAction, 
  deleteCategoryAction 
} from '@/lib/actions';

const PRESET_ICONS = ['💳', '🏧', '📈', '💵', '🧾', '🏦', '💼', '💎', '⚡', '🏷️', '💰', '📊'];

export default function ProductList({ 
  products, 
  categories 
}: { 
  products: Product[]; 
  categories: Category[];
}) {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [filterCategory, setFilterCategory] = useState<number | 'uncategorized' | 'all'>('all');
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [selectedNewIcon, setSelectedNewIcon] = useState('💳');

  // Filter products
  const filteredProducts = products.filter(p => {
    if (filterCategory === 'all') return true;
    if (filterCategory === 'uncategorized') return !p.category_id;
    return p.category_id === filterCategory;
  });

  // Map category id to category object
  const categoryMap = new Map<number, Category>();
  categories.forEach(c => categoryMap.set(c.id, c));

  const uncategorizedCount = products.filter(p => !p.category_id).length;

  return (
    <>
      <div className="card" style={{ padding: '14px 16px', borderRadius: '20px', marginTop: '16px', boxSizing: 'border-box', width: '100%' }}>
        {/* Header & Category Management Button */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
          <div className="list-header-left" style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h2 style={{ fontSize: '1rem', fontWeight: 700, margin: 0 }}>Danh mục dịch vụ</h2>
            <span className="count-badge">{filteredProducts.length}</span>
          </div>

          <button
            type="button"
            onClick={() => setIsCategoryModalOpen(true)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: '#EFF6FF',
              color: 'var(--primary)',
              border: '1px solid #BFDBFE',
              borderRadius: '10px',
              padding: '6px 12px',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            <span>🏷️</span>
            <span>Quản lý phân loại</span>
          </button>
        </div>

        {/* Category filter tabs */}
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '12px' }}>
          <button
            onClick={() => setFilterCategory('all')}
            style={{
              border: 'none',
              padding: '5px 10px',
              borderRadius: '8px',
              fontSize: '0.75rem',
              fontWeight: 600,
              cursor: 'pointer',
              background: filterCategory === 'all' ? 'var(--primary)' : '#F3F4F6',
              color: filterCategory === 'all' ? 'white' : '#6B7280'
            }}
          >
            Tất cả ({products.length})
          </button>

          {categories.map(cat => {
            const count = products.filter(p => p.category_id === cat.id).length;
            const isSelected = filterCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setFilterCategory(cat.id)}
                style={{
                  border: 'none',
                  padding: '5px 10px',
                  borderRadius: '8px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  background: isSelected ? 'var(--primary)' : '#F3F4F6',
                  color: isSelected ? 'white' : '#6B7280'
                }}
              >
                {cat.icon || '💳'} {cat.name} ({count})
              </button>
            );
          })}

          {uncategorizedCount > 0 && (
            <button
              onClick={() => setFilterCategory('uncategorized')}
              style={{
                border: 'none',
                padding: '5px 10px',
                borderRadius: '8px',
                fontSize: '0.75rem',
                fontWeight: 600,
                cursor: 'pointer',
                background: filterCategory === 'uncategorized' ? 'var(--primary)' : '#F3F4F6',
                color: filterCategory === 'uncategorized' ? 'white' : '#6B7280'
              }}
            >
              Chưa phân loại ({uncategorizedCount})
            </button>
          )}
        </div>

        {/* Product list */}
        <div>
          {filteredProducts.map(p => {
            const cat = p.category_id ? categoryMap.get(p.category_id) : null;
            const icon = cat?.icon || '💳';
            const catName = cat?.name || 'Chưa phân loại';

            return (
              <div 
                key={p.id} 
                className="customer-row"
                style={{ cursor: 'pointer', boxSizing: 'border-box' }}
                onClick={() => setEditingProduct(p)}
              >
                <div 
                  className="customer-avatar" 
                  style={{ 
                    background: '#EFF6FF', 
                    color: 'var(--primary)', 
                    fontSize: '1.25rem', 
                    flexShrink: 0 
                  }}
                >
                  {icon}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="customer-name" style={{ fontSize: '0.9375rem', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {p.name}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#6B7280', marginTop: '1px', fontWeight: 500 }}>
                    {catName}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
                  <span style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#1A1A2E', whiteSpace: 'nowrap' }}>
                    {new Intl.NumberFormat('vi-VN').format(Number(p.price))}&nbsp;đ
                  </span>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingProduct(p);
                    }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      background: '#EFF6FF',
                      color: 'var(--primary)',
                      border: '1px solid #BFDBFE',
                      borderRadius: '10px',
                      padding: '4px 9px',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                    title="Sửa dịch vụ"
                  >
                    <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={{ width: '13px', height: '13px' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                    </svg>
                    <span>Sửa</span>
                  </button>
                </div>
              </div>
            );
          })}

          {filteredProducts.length === 0 && (
            <div className="text-center text-muted" style={{ padding: '32px 0', fontSize: '0.875rem' }}>
              Chưa có dịch vụ nào trong phân loại này.
            </div>
          )}
        </div>
      </div>

      {/* ─── MODAL CHỈNH SỬA DỊCH VỤ ─── */}
      {editingProduct && (
        <div className="modal-overlay" onClick={() => setEditingProduct(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 700, margin: 0, color: '#111827' }}>Sửa dịch vụ / biểu phí</h3>
              <button 
                onClick={() => setEditingProduct(null)}
                style={{ background: 'none', border: 'none', fontSize: '1.25rem', cursor: 'pointer', color: '#9CA3AF' }}
              >
                ✕
              </button>
            </div>

            <form action={async (formData) => {
              await updateProductAction(formData);
              setEditingProduct(null);
            }}>
              <input type="hidden" name="productId" value={editingProduct.id} />

              <div className="input-group">
                <label>Tên dịch vụ</label>
                <input 
                  type="text" 
                  name="name" 
                  className="input" 
                  defaultValue={editingProduct.name} 
                  required 
                  autoFocus
                />
              </div>

              <div className="input-group">
                <label>Giá tiền / Định mức (VND)</label>
                <input 
                  type="number" 
                  name="price" 
                  className="input" 
                  defaultValue={editingProduct.price} 
                  required 
                />
              </div>

              <div className="input-group">
                <label>Phân loại</label>
                <select 
                  name="categoryId" 
                  className="input" 
                  defaultValue={editingProduct.category_id || ''}
                >
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>
                      {cat.icon || '💳'} {cat.name}
                    </option>
                  ))}
                  <option value="">Chưa phân loại</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                <button 
                  type="button" 
                  onClick={() => setEditingProduct(null)}
                  style={{
                    flex: 1,
                    padding: '12px',
                    borderRadius: '12px',
                    border: '1px solid #D1D5DB',
                    background: '#F3F4F6',
                    fontWeight: 600,
                    cursor: 'pointer',
                    color: '#4B5563'
                  }}
                >
                  Hủy
                </button>
                <button 
                  type="submit" 
                  className="btn" 
                  style={{ flex: 1.5, padding: '12px', margin: 0 }}
                >
                  Lưu thay đổi
                </button>
              </div>
            </form>

            {/* Nút xóa dịch vụ */}
            <form 
              action={async (formData) => {
                if (confirm(`Bạn có chắc muốn xoá dịch vụ "${editingProduct.name}"?`)) {
                  await deleteProductAction(formData);
                  setEditingProduct(null);
                }
              }}
              style={{ marginTop: '12px', textAlign: 'center' }}
            >
              <input type="hidden" name="productId" value={editingProduct.id} />
              <button 
                type="submit" 
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  color: 'var(--danger)', 
                  fontSize: '0.8rem', 
                  fontWeight: 600, 
                  cursor: 'pointer',
                  padding: '6px'
                }}
              >
                Xóa dịch vụ này khỏi danh mục
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ─── MODAL QUẢN LÝ PHÂN LOẠI ─── */}
      {isCategoryModalOpen && (
        <div className="modal-overlay" onClick={() => { setIsCategoryModalOpen(false); setEditingCategory(null); }}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '480px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 700, margin: 0, color: '#111827' }}>
                Quản lý nhóm phân loại
              </h3>
              <button 
                onClick={() => { setIsCategoryModalOpen(false); setEditingCategory(null); }}
                style={{ background: 'none', border: 'none', fontSize: '1.25rem', cursor: 'pointer', color: '#9CA3AF' }}
              >
                ✕
              </button>
            </div>

            {/* Form sửa hoặc thêm category */}
            <div style={{ background: '#F9FAFB', padding: '14px', borderRadius: '14px', border: '1px solid #E5E7EB', marginBottom: '16px' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1F2937', marginBottom: '10px' }}>
                {editingCategory ? `Đang sửa nhóm: "${editingCategory.name}"` : 'Tạo nhóm phân loại mới'}
              </div>

              {editingCategory ? (
                <form action={async (formData) => {
                  await updateCategoryAction(formData);
                  setEditingCategory(null);
                }}>
                  <input type="hidden" name="id" value={editingCategory.id} />
                  
                  <div className="input-group" style={{ marginBottom: '10px' }}>
                    <label style={{ fontSize: '0.75rem' }}>Tên nhóm</label>
                    <input 
                      type="text" 
                      name="name" 
                      className="input" 
                      defaultValue={editingCategory.name} 
                      required 
                      autoFocus
                    />
                  </div>

                  <div className="input-group" style={{ marginBottom: '10px' }}>
                    <label style={{ fontSize: '0.75rem' }}>Biểu tượng icon</label>
                    <input type="hidden" name="icon" value={selectedNewIcon} />
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '4px' }}>
                      {PRESET_ICONS.map(ic => (
                        <button
                          key={ic}
                          type="button"
                          onClick={() => setSelectedNewIcon(ic)}
                          style={{
                            padding: '6px 8px',
                            borderRadius: '8px',
                            border: selectedNewIcon === ic ? '2px solid var(--primary)' : '1px solid #E5E7EB',
                            background: selectedNewIcon === ic ? '#EFF6FF' : '#FFF',
                            cursor: 'pointer',
                            fontSize: '1.1rem'
                          }}
                        >
                          {ic}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                    <button 
                      type="button" 
                      onClick={() => setEditingCategory(null)}
                      style={{
                        flex: 1,
                        padding: '8px',
                        borderRadius: '8px',
                        border: '1px solid #D1D5DB',
                        background: '#FFF',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      Hủy
                    </button>
                    <button 
                      type="submit" 
                      className="btn" 
                      style={{ flex: 1.5, padding: '8px', margin: 0, fontSize: '0.8rem' }}
                    >
                      Lưu thay đổi
                    </button>
                  </div>
                </form>
              ) : (
                <form action={async (formData) => {
                  await addCategoryAction(formData);
                  const input = document.getElementById('new-cat-name') as HTMLInputElement;
                  if (input) input.value = '';
                }}>
                  <div className="input-group" style={{ marginBottom: '10px' }}>
                    <label style={{ fontSize: '0.75rem' }}>Tên nhóm mới</label>
                    <input 
                      id="new-cat-name"
                      type="text" 
                      name="name" 
                      className="input" 
                      placeholder="VD: Vay đáo hạn, Phí thường niên..." 
                      required 
                    />
                  </div>

                  <div className="input-group" style={{ marginBottom: '10px' }}>
                    <label style={{ fontSize: '0.75rem' }}>Biểu tượng icon</label>
                    <input type="hidden" name="icon" value={selectedNewIcon} />
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '4px' }}>
                      {PRESET_ICONS.map(ic => (
                        <button
                          key={ic}
                          type="button"
                          onClick={() => setSelectedNewIcon(ic)}
                          style={{
                            padding: '6px 8px',
                            borderRadius: '8px',
                            border: selectedNewIcon === ic ? '2px solid var(--primary)' : '1px solid #E5E7EB',
                            background: selectedNewIcon === ic ? '#EFF6FF' : '#FFF',
                            cursor: 'pointer',
                            fontSize: '1.1rem'
                          }}
                        >
                          {ic}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    className="btn" 
                    style={{ width: '100%', padding: '10px', margin: 0, fontSize: '0.85rem' }}
                  >
                    + Thêm nhóm phân loại
                  </button>
                </form>
              )}
            </div>

            {/* Danh sách các nhóm hiện có */}
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#374151', marginBottom: '8px' }}>
              Các nhóm hiện tại ({categories.length})
            </div>

            <div style={{ maxHeight: '250px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {categories.map(cat => {
                const count = products.filter(p => p.category_id === cat.id).length;

                return (
                  <div 
                    key={cat.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 12px',
                      background: '#FFFFFF',
                      border: '1px solid #E5E7EB',
                      borderRadius: '12px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0, flex: 1 }}>
                      <span style={{ fontSize: '1.25rem' }}>{cat.icon || '💳'}</span>
                      <div style={{ minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#111827' }}>
                          {cat.name}
                        </div>
                        <div style={{ fontSize: '0.725rem', color: '#6B7280' }}>
                          {count} dịch vụ
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <button
                        type="button"
                        onClick={() => {
                          setEditingCategory(cat);
                          setSelectedNewIcon(cat.icon || '💳');
                        }}
                        style={{
                          background: '#F3F4F6',
                          border: 'none',
                          padding: '5px 8px',
                          borderRadius: '8px',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          color: '#374151',
                          cursor: 'pointer'
                        }}
                      >
                        Sửa
                      </button>

                      {/* Xoá nhóm */}
                      <form action={async (formData) => {
                        const msg = count > 0 
                          ? `Nhóm "${cat.name}" đang có ${count} dịch vụ.\nNếu xoá, các dịch vụ này sẽ chuyển sang trạng thái "Chưa phân loại".\n\nBạn có chắc chắn muốn xoá?`
                          : `Bạn có chắc muốn xoá nhóm "${cat.name}"?`;
                        
                        if (confirm(msg)) {
                          await deleteCategoryAction(formData);
                          if (filterCategory === cat.id) {
                            setFilterCategory('all');
                          }
                        }
                      }}>
                        <input type="hidden" name="id" value={cat.id} />
                        <button
                          type="submit"
                          style={{
                            background: '#FEE2E2',
                            border: 'none',
                            padding: '5px 8px',
                            borderRadius: '8px',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            color: '#DC2626',
                            cursor: 'pointer'
                          }}
                          title="Xóa nhóm này"
                        >
                          Xóa
                        </button>
                      </form>
                    </div>
                  </div>
                );
              })}

              {categories.length === 0 && (
                <div style={{ textAlign: 'center', padding: '16px', color: '#9CA3AF', fontSize: '0.8rem' }}>
                  Chưa có nhóm nào. Vui lòng thêm nhóm ở trên.
                </div>
              )}
            </div>

            <div style={{ marginTop: '16px', textAlign: 'right' }}>
              <button
                type="button"
                onClick={() => { setIsCategoryModalOpen(false); setEditingCategory(null); }}
                className="btn"
                style={{ padding: '10px 20px', margin: 0, fontSize: '0.85rem' }}
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
