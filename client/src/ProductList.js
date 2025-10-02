// import React, { useMemo, useState, useEffect } from "react";
// import { useSearchParams } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import { useCart } from "./CartContext";

// const BASE_PRODUCTS = [
//   // ---------- MEN ----------
//   { id: 1,  name: "Men's Classic Tee", description: "Soft cotton T-shirt with a relaxed fit.", price: 19.99,
//     image: "https://images.unsplash.com/photo-1520975979651-6a43fbe6d7a8?w=800", category: "Men", sizes: ["S","M","L","XL"] },
//   { id: 2,  name: "Men's Denim Jacket", description: "Timeless blue denim jacket with sturdy stitching.", price: 59.99,
//     image: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=800", category: "Men", sizes: ["S","M","L","XL"] },
//   { id: 3,  name: "Men's Slim Jeans", description: "Stretch denim for a modern slim fit.", price: 45.50,
//     image: "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?w=800", category: "Men", sizes: ["S","M","L","XL"] },
//   { id: 4,  name: "Men's Hoodie", description: "Cozy fleece hoodie for chilly evenings.", price: 29.99,
//     image: "https://images.unsplash.com/photo-1602810318383-e607d6f33f3c?w=800", category: "Men", sizes: ["S","M","L","XL"] },
//   { id: 5,  name: "Men's Leather Jacket", description: "Premium leather biker jacket.", price: 129.99,
//     image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800", category: "Men", sizes: ["S","M","L","XL"] },
//   { id: 6,  name: "Men's Polo Shirt", description: "Classic pique polo with button placket.", price: 25.99,
//     image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800", category: "Men", sizes: ["S","M","L","XL"] },
//   { id: 7,  name: "Men's Chinos", description: "Slim-fit chinos for office and casual wear.", price: 42.00,
//     image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800", category: "Men", sizes: ["S","M","L","XL"] },
//   { id: 8,  name: "Men's Track Jacket", description: "Lightweight sporty track jacket.", price: 38.50,
//     image: "https://images.unsplash.com/photo-1554568218-0f1715fbd6df?w=800", category: "Men", sizes: ["S","M","L","XL"] },

//   // ---------- WOMEN ----------
//   { id: 9,  name: "Women's Summer Dress", description: "Lightweight floral dress perfect for warm days.", price: 39.50,
//     image: "https://images.unsplash.com/photo-1520975582071-1b3f62e3f4ac?w=800", category: "Women", sizes: ["S","M","L"] },
//   { id:10,  name: "Women's Denim Jacket", description: "Classic cropped denim jacket.", price: 55.00,
//     image: "https://images.unsplash.com/photo-1520975979651-6a43fbe6d7a8?w=800", category: "Women", sizes: ["S","M","L"] },
//   { id:11,  name: "Women's Cardigan", description: "Cozy knit cardigan with open front.", price: 49.99,
//     image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800", category: "Women", sizes: ["S","M","L"] },
//   { id:12,  name: "Women's Skinny Jeans", description: "High-rise stretch denim skinny jeans.", price: 44.99,
//     image: "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?w=800", category: "Women", sizes: ["S","M","L"] },
//   { id:13,  name: "Women's Hoodie", description: "Soft fleece hoodie for everyday comfort.", price: 28.99,
//     image: "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=800", category: "Women", sizes: ["S","M","L"] },
//   { id:14,  name: "Women's Blazer", description: "Tailored blazer for work or evening wear.", price: 65.00,
//     image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800", category: "Women", sizes: ["S","M","L"] },
//   { id:15,  name: "Women's Leather Jacket", description: "Chic moto leather jacket.", price: 120.00,
//     image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800", category: "Women", sizes: ["S","M","L"] },
//   { id:16,  name: "Women's Maxi Dress", description: "Elegant floor-length evening maxi dress.", price: 70.00,
//     image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800", category: "Women", sizes: ["S","M","L"] },

//   // ---------- KIDS ----------
//   { id:17,  name: "Kids' Hoodie", description: "Cozy fleece hoodie for everyday adventures.", price: 24.00,
//     image: "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=800", category: "Kids", sizes: ["S","M","L","XL"] },
//   { id:18,  name: "Kids' T-shirt", description: "Soft cotton tee for playtime.", price: 14.99,
//     image: "https://images.unsplash.com/photo-1520975979651-6a43fbe6d7a8?w=800", category: "Kids", sizes: ["S","M","L","XL"] },
//   { id:19,  name: "Kids' Jeans", description: "Stretchy denim jeans built for comfort.", price: 22.50,
//     image: "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?w=800", category: "Kids", sizes: ["S","M","L","XL"] },
//   { id:20,  name: "Kids' Jacket", description: "Warm padded jacket for colder days.", price: 34.99,
//     image: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=800", category: "Kids", sizes: ["S","M","L","XL"] },
//   { id:21,  name: "Kids' Polo Shirt", description: "Smart casual cotton polo.", price: 18.99,
//     image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800", category: "Kids", sizes: ["S","M","L","XL"] },
//   { id:22,  name: "Kids' Dress", description: "Adorable cotton dress for parties.", price: 25.00,
//     image: "https://images.unsplash.com/photo-1520975582071-1b3f62e3f4ac?w=800", category: "Kids", sizes: ["S","M","L","XL"] },
//   { id:23,  name: "Kids' Sweatpants", description: "Comfy joggers with elastic waist.", price: 19.00,
//     image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800", category: "Kids", sizes: ["S","M","L","XL"] },
//   { id:24,  name: "Kids' Raincoat", description: "Waterproof jacket for rainy days.", price: 29.50,
//     image: "https://images.unsplash.com/photo-1554568218-0f1715fbd6df?w=800", category: "Kids", sizes: ["S","M","L","XL"] },
//   { id:25,  name: "Kids' Winter Parka", description: "Insulated parka for extra warmth.", price: 45.00,
//     image: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=800", category: "Kids", sizes: ["S","M","L","XL"] },
// ];
// // duplicate a bit for pagination demo
// const PRODUCTS = Array.from({length:3}).flatMap((_,i)=>
//   BASE_PRODUCTS.map(p=>({...p,id:`${i}-${p.id}`,name:i?p.name+` (${i+1})`:p.name}))
// );

// const clamp = (n,min,max)=>Math.max(min,Math.min(max,n));

// export default function ProductList() {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const page = clamp(parseInt(searchParams.get("page")||"1",10),1,999);
//   const limit = clamp(parseInt(searchParams.get("limit")||"10",10),1,50);
//   const navigate = useNavigate();
//   const { addToCart } = useCart();

//   const [query,setQuery] = useState("");
//   const [category,setCategory] = useState("All");
//   const [size,setSize] = useState("All");
//   const [minPrice,setMinPrice] = useState("");
//   const [maxPrice,setMaxPrice] = useState("");

//   // reset to page 1 whenever filters change
//   useEffect(()=>{ setSearchParams({page:"1",limit:String(limit)}); },
//     [query,category,size,minPrice,maxPrice]);

//   const resetFilters = () => {
//     setQuery("");
//     setCategory("All");
//     setSize("All");
//     setMinPrice("");
//     setMaxPrice("");
//     setSearchParams({page:"1",limit:String(limit)});
//   };

//   const filtered = useMemo(()=>{
//     const q = query.trim().toLowerCase();
//     const min = minPrice===""?-Infinity:parseFloat(minPrice);
//     const max = maxPrice===""?Infinity:parseFloat(maxPrice);
//     return PRODUCTS.filter(p =>
//       (!q || p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)) &&
//       (category==="All" || p.category===category) &&
//       (size==="All" || p.sizes.includes(size)) &&
//       (p.price>=min && p.price<=max)
//     );
//   },[query,category,size,minPrice,maxPrice]);

//   const total = filtered.length;
//   const totalPages = Math.max(1,Math.ceil(total/limit));
//   const safePage = clamp(page,1,totalPages);
//   const start = (safePage-1)*limit;
//   const pageItems = filtered.slice(start,start+limit);

//   const goToPage = (n)=>setSearchParams({page:String(clamp(n,1,totalPages)),limit:String(limit)});
//   const changeLimit = (n)=>setSearchParams({page:"1",limit:String(n)});

//     const onAddToCart = (product) => {
//       addToCart(product);
//     // Replace with your cart logic (context/redux/backend)
//     // console.log("Add to cart:", product.id, product.name);
//     // alert(`Added "${product.name}" to cart`);
//     // navigate("/cart"); 
//   };

//   return (
//  <div style={styles.container}>
//       <h1 style={styles.title}>Product Catalog</h1>

//       <div style={styles.controls}>
//         <input style={styles.input} placeholder="Search…" value={query}
//           onChange={e=>setQuery(e.target.value)} />

//         <select style={styles.select} value={category} onChange={e=>setCategory(e.target.value)}>
//           <option>All</option><option>Men</option><option>Women</option><option>Kids</option>
//         </select>

//         <select style={styles.select} value={size} onChange={e=>setSize(e.target.value)}>
//           <option>All</option><option>S</option><option>M</option><option>L</option><option>XL</option>
//         </select>

//         <input type="number" placeholder="Min $" style={styles.priceInput}
//           value={minPrice} onChange={e=>setMinPrice(e.target.value)} />
//         <input type="number" placeholder="Max $" style={styles.priceInput}
//           value={maxPrice} onChange={e=>setMaxPrice(e.target.value)} />

//         <button onClick={resetFilters} style={styles.resetBtn}>Reset</button>

//         <label style={{marginLeft:8}}>Per page</label>
//         <select style={styles.select} value={limit} onChange={e=>changeLimit(parseInt(e.target.value,10))}>
//           <option value={5}>5</option><option value={10}>10</option><option value={20}>20</option>
//         </select>

//         {/* Cart button to the right of Per page dropdown */}
//         <button style={styles.cartNavBtn} onClick={()=>navigate("/cart")}>
//           Cart
//           <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{marginLeft:8}}>
//             <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm8 0c-1.1 
//               0-1.99.9-1.99 2S13.9 22 15 22s2-.9 2-2-.9-2-2-2zM7.16 14h8.94c.75 0 
//               1.41-.41 1.75-1.03l3.58-6.49A1 1 0 0 0 20.58 5H6.21l-.94-2H2v2h2l3.6 
//               7.59-1.35 2.45C5.52 15.37 6.48 17 8 17h12v-2H8l1.16-1z"/>
//           </svg>
//         </button>
//       </div>

//       <div style={styles.summary}>
//         Showing {pageItems.length} of {total} items — Page {safePage} of {totalPages}
//       </div>

//       <table style={styles.table}>
//         <thead>
//           <tr>
//             <th style={styles.th}>Image</th>
//             <th style={styles.th}>Name</th>
//             <th style={styles.th}>Description</th>
//             <th style={styles.th}>Price</th>
//             <th style={styles.th}>Category</th>
//             <th style={styles.th}>Sizes</th>
//             <th style={styles.th}>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {pageItems.length? pageItems.map(p=>(
//             <tr key={p.id}>
//               <td style={styles.td}><img src={p.image} alt={p.name} style={styles.image}/></td>
//               <td style={styles.td}>{p.name}</td>
//               <td style={styles.td}>{p.description}</td>
//               <td style={styles.td}>${p.price.toFixed(2)}</td>
//               <td style={styles.td}>{p.category}</td>
//               <td style={styles.td}>{p.sizes.join(", ")}</td>
//               <td style={{...styles.td, width: 80}}>
//                 <button
//                   title="Add to cart"
//                   onClick={()=>onAddToCart(p)}
//                   style={styles.cartBtn}
//                   aria-label={`Add ${p.name} to cart`}
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
//                     <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm8 0c-1.1 
//                       0-1.99.9-1.99 2S13.9 22 15 22s2-.9 2-2-.9-2-2-2zM7.16 14h8.94c.75 0 
//                       1.41-.41 1.75-1.03l3.58-6.49A1 1 0 0 0 20.58 5H6.21l-.94-2H2v2h2l3.6 
//                       7.59-1.35 2.45C5.52 15.37 6.48 17 8 17h12v-2H8l1.16-1z"/>
//                   </svg>
//                 </button>
//               </td>
//             </tr>
//           )):<tr><td colSpan={7} style={styles.empty}>No products match your filters.</td></tr>}
//         </tbody>
//       </table>

//       <div style={styles.pagination}>
//         <button style={styles.pageBtn} disabled={safePage<=1} onClick={()=>goToPage(safePage-1)}>← Prev</button>
//         {Array.from({length:totalPages}).map((_,i)=>(
//           <button key={i} onClick={()=>goToPage(i+1)}
//             style={{...styles.pageNumberBtn, ...(i+1===safePage?styles.pageNumberActive:{})}}>
//             {i+1}
//           </button>
//         ))}
//         <button style={styles.pageBtn} disabled={safePage>=totalPages} onClick={()=>goToPage(safePage+1)}>Next →</button>
//       </div>
//     </div>
//   );
// }

// const styles = {
//   container:{padding:"24px",background:"#f9fafb",minHeight:"100vh",fontFamily:"sans-serif"},
//   title:{textAlign:"center",marginBottom:16},
//   controls:{display:"flex",flexWrap:"wrap",gap:8,justifyContent:"center",marginBottom:12},
//   input:{padding:"8px 12px",border:"1px solid #ccc",borderRadius:6,minWidth:180},
//   select:{padding:"8px 12px",border:"1px solid #ccc",borderRadius:6},
//   priceInput:{width:90,padding:"8px 12px",border:"1px solid #ccc",borderRadius:6},
//   resetBtn:{padding:"8px 16px",background:"#ef4444",color:"#fff",border:"none",borderRadius:6,cursor:"pointer"},
//   summary:{textAlign:"center",margin:"8px 0",color:"#374151"},
//   table:{width:"100%",maxWidth:1200,margin:"0 auto",borderCollapse:"collapse",background:"#fff",boxShadow:"0 2px 6px rgba(0,0,0,0.05)"},
//   th:{padding:12,borderBottom:"2px solid #eee",background:"#f3f4f6",textAlign:"left"},
//   td:{padding:12,borderBottom:"1px solid #eee",verticalAlign:"top"},
//   image:{width:80,height:80,objectFit:"cover",borderRadius:8},
//   empty:{padding:24,textAlign:"center",color:"#6b7280"},
//   pagination:{display:"flex",justifyContent:"center",gap:8,marginTop:16,flexWrap:"wrap"},
//   pageBtn:{padding:"6px 12px",border:"1px solid #ccc",borderRadius:6,background:"#fff",cursor:"pointer"},
//   pageNumberBtn:{padding:"6px 10px",border:"1px solid #ccc",borderRadius:6,background:"#fff",cursor:"pointer"},
//   pageNumberActive:{background:"#2563eb",color:"#fff",borderColor:"#2563eb"}
// };

import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";

export default function ProductList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [size, setSize] = useState("All");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const addItemToCart = async (productId, qty = 1) => {
    try {
      const token = localStorage.getItem("token"); // if auth is required
      const res = await fetch("http://localhost:4000/api/cart/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({ productId, qty }),
      });

      if (!res.ok) {
        const err = await res.json();
        alert(err.message || "Failed to add item to cart");
        return null;
      }

      const cartData = await res.json();
      console.log("Cart after adding:", cartData);
      return cartData;
    } catch (err) {
      console.error(err);
      alert("Error adding item to cart");
      return null;
    }
  };


  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page,
        limit,
        ...(query && { q: query }),
        ...(category !== "All" && { category }),
        ...(size !== "All" && { size }),
        ...(minPrice && { minPrice }),
        ...(maxPrice && { maxPrice }),
      });

      const token = localStorage.getItem("token");

      const res = await fetch(`http://localhost:4000/api/products?${params.toString()}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      const data = await res.json();
      setProducts(data.data);
      setTotal(data.meta.total);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    setSearchParams({ page: String(page), limit: String(limit) });
    fetchProducts();
  }, [page, limit, query, category, size, minPrice, maxPrice]);

  const totalPages = Math.ceil(total / limit);
  const safePage = Math.max(1, Math.min(page, totalPages));

  const goToPage = (n) => setSearchParams({ page: String(n), limit: String(limit) });
  const changeLimit = (n) => setSearchParams({ page: "1", limit: String(n) });

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Product Catalog</h1>

      {/* Filters */}
      <div style={styles.controls}>
        <input style={styles.input} placeholder="Search…" value={query} onChange={(e) => setQuery(e.target.value)} />
        <select style={styles.select} value={category} onChange={(e) => setCategory(e.target.value)}>
          <option>All</option>
          <option>Men</option>
          <option>Women</option>
          <option>Kids</option>
        </select>
        <select style={styles.select} value={size} onChange={(e) => setSize(e.target.value)}>
          <option>All</option>
          <option>S</option>
          <option>M</option>
          <option>L</option>
          <option>XL</option>
        </select>
        <input type="number" placeholder="Min $" style={styles.priceInput} value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
        <input type="number" placeholder="Max $" style={styles.priceInput} value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
        <button style={styles.resetBtn} onClick={() => { setQuery(""); setCategory("All"); setSize("All"); setMinPrice(""); setMaxPrice(""); }}>
          Reset
        </button>

        <label style={{ marginLeft: 8 }}>Per page</label>
        <select style={styles.select} value={limit} onChange={(e) => changeLimit(parseInt(e.target.value, 10))}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>

        <button style={styles.cartNavBtn} onClick={() => navigate("/cart")}>
          Cart
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ marginLeft: 8 }}>
            <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm8 0c-1.1 
              0-1.99.9-1.99 2S13.9 22 15 22s2-.9 2-2-.9-2-2-2zM7.16 14h8.94c.75 0 
              1.41-.41 1.75-1.03l3.58-6.49A1 1 0 0 0 20.58 5H6.21l-.94-2H2v2h2l3.6 
              7.59-1.35 2.45C5.52 15.37 6.48 17 8 17h12v-2H8l1.16-1z"/>
          </svg>
        </button>
      </div>

      {loading ? <p>Loading...</p> : (
        <>
          <div style={styles.summary}>
            Showing {products.length} of {total} items — Page {safePage} of {totalPages}
          </div>

          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Image</th>
                <th style={styles.th}>Title</th>
                <th style={styles.th}>Description</th>
                <th style={styles.th}>Price</th>
                <th style={styles.th}>Category</th>
                <th style={styles.th}>Sizes</th>
                <th style={styles.th}>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.length ? products.map((p) => (
                <tr key={p._id}>
                  <td style={styles.td}><img src={p.images[0]} alt={p.title} style={styles.image} /></td>
                  <td style={styles.td}>{p.title}</td>
                  <td style={styles.td}>{p.description}</td>
                  <td style={styles.td}>${p.price.toFixed(2)}</td>
                  <td style={styles.td}>{p.category}</td>
                  <td style={styles.td}>{p.sizes.join(", ")}</td>
                  <td style={{ ...styles.td, width: 80 }}>
                    <button title="Add to cart" onClick={async () => {
                      await addItemToCart(p._id, 1); 
                      addToCart(p);
                    }} style={styles.cartBtn}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                        <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm8 0c-1.1 
                          0-1.99.9-1.99 2S13.9 22 15 22s2-.9 2-2-.9-2-2-2zM7.16 14h8.94c.75 0 
                          1.41-.41 1.75-1.03l3.58-6.49A1 1 0 0 0 20.58 5H6.21l-.94-2H2v2h2l3.6 
                          7.59-1.35 2.45C5.52 15.37 6.48 17 8 17h12v-2H8l1.16-1z"/>
                      </svg>
                    </button>
                  </td>
                </tr>
              )) : <tr><td colSpan={7} style={styles.empty}>No products match your filters.</td></tr>}
            </tbody>
          </table>

          <div style={styles.pagination}>
            <button style={styles.pageBtn} disabled={safePage <= 1} onClick={() => goToPage(safePage - 1)}>← Prev</button>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button key={i} onClick={() => goToPage(i + 1)}
                style={{ ...styles.pageNumberBtn, ...(i + 1 === safePage ? styles.pageNumberActive : {}) }}>
                {i + 1}
              </button>
            ))}
            <button style={styles.pageBtn} disabled={safePage >= totalPages} onClick={() => goToPage(safePage + 1)}>Next →</button>
          </div>
        </>
      )}
    </div>
  );
}

const styles = {
  container: { padding: "24px", background: "#f9fafb", minHeight: "100vh", fontFamily: "sans-serif" },
  title: { textAlign: "center", marginBottom: 16 },
  controls: { display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", marginBottom: 12 },
  input: { padding: "8px 12px", border: "1px solid #ccc", borderRadius: 6, minWidth: 180 },
  select: { padding: "8px 12px", border: "1px solid #ccc", borderRadius: 6 },
  priceInput: { width: 90, padding: "8px 12px", border: "1px solid #ccc", borderRadius: 6 },
  resetBtn: { padding: "8px 16px", background: "#ef4444", color: "#fff", border: "none", borderRadius: 6, cursor: "pointer" },
  summary: { textAlign: "center", margin: "8px 0", color: "#374151" },
  table: { width: "100%", maxWidth: 1200, margin: "0 auto", borderCollapse: "collapse", background: "#fff", boxShadow: "0 2px 6px rgba(0,0,0,0.05)" },
  th: { padding: 12, borderBottom: "2px solid #eee", background: "#f3f4f6", textAlign: "left" },
  td: { padding: 12, borderBottom: "1px solid #eee", verticalAlign: "top" },
  image: { width: 80, height: 80, objectFit: "cover", borderRadius: 8 },
  empty: { padding: 24, textAlign: "center", color: "#6b7280" },
  pagination: { display: "flex", justifyContent: "center", gap: 8, marginTop: 16, flexWrap: "wrap" },
  pageBtn: { padding: "6px 12px", border: "1px solid #ccc", borderRadius: 6, background: "#fff", cursor: "pointer" },
  pageNumberBtn: { padding: "6px 10px", border: "1px solid #ccc", borderRadius: 6, background: "#fff", cursor: "pointer" },
  pageNumberActive: { background: "#2563eb", color: "#fff", borderColor: "#2563eb" }
};