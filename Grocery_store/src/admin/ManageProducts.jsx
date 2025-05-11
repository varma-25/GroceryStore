import React, { useState } from "react";

const ManageProducts = () => {
  const [showForm, setShowForm] = useState(false);
  const [product, setProduct] = useState({ name: "", price: "", image: null });
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ name: "", price: "", image: null });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProduct({ ...product, image: URL.createObjectURL(file) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setProducts([...products, { ...product, id: Date.now(), published: false }]);
    setProduct({ name: "", price: "", image: null });
    setShowForm(false);
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleEditImageChange = (e) => {
    const file = e.target.files[0];
    setEditData({ ...editData, image: URL.createObjectURL(file) });
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
    setEditData({ name: product.name, price: product.price, image: product.image });
  };

  const handleUpdate = (id) => {
    const updated = products.map((p) =>
      p.id === id ? { ...p, name: editData.name, price: editData.price, image: editData.image } : p
    );
    setProducts(updated);
    setEditingId(null);
  };

  const handlePublish = (id) => {
    const updated = products.map((p) =>
      p.id === id ? { ...p, published: true } : p
    );
    setProducts(updated);
  };

  return (
    <div>
      <h2>Manage Products</h2>
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? "Cancel" : "Add Product"}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>
          <div>
            <label>Product Name:</label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Price:</label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Image:</label>
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
            />
            {product.image && <img src={product.image} alt="Product" style={{ width: "100px", marginTop: "10px" }} />}
          </div>

          <button type="submit">Save Product</button>
        </form>
      )}

      {/* Product List */}
      <div style={{ marginTop: "2rem" }}>
        <h3>Product List</h3>
        {products.length === 0 ? (
          <p>No products added yet.</p>
        ) : (
          <table border="1" cellPadding="10">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id}>
                  <td>
                    {editingId === p.id ? (
                      <input
                        type="text"
                        name="name"
                        value={editData.name}
                        onChange={handleEditChange}
                      />
                    ) : (
                      p.name
                    )}
                  </td>
                  <td>
                    {editingId === p.id ? (
                      <input
                        type="number"
                        name="price"
                        value={editData.price}
                        onChange={handleEditChange}
                      />
                    ) : (
                      `₹${p.price}`
                    )}
                  </td>
                  <td>
                    {editingId === p.id ? (
                      <input
                        type="file"
                        name="image"
                        onChange={handleEditImageChange}
                      />
                    ) : (
                      p.image && <img src={p.image} alt="Product" style={{ width: "50px" }} />
                    )}
                  </td>
                  <td>
                    {editingId === p.id ? (
                      <button onClick={() => handleUpdate(p.id)}>Save</button>
                    ) : (
                      <>
                        <button onClick={() => handleEdit(p)}>Edit</button>
                        {!p.published && (
                          <button onClick={() => handlePublish(p.id)}>Publish</button>
                        )}
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ManageProducts;
