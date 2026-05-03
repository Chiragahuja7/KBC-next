export function optimizeImageUrl(url, width = 800) {
  if (!url || typeof url !== "string") return url;

  // Optimize Cloudinary URLs
  if (url.includes("res.cloudinary.com") && url.includes("/upload/")) {
    // Avoid double optimization or messing up custom transformation paths
    if (!url.includes("f_auto") && !url.includes("q_auto")) {
      return url.replace("/upload/", `/upload/c_limit,w_${width},f_auto,q_auto/`);
    }
  }
  return url;
}

export function optimizeProduct(product, width = 800) {
  if (!product) return product;

  // Deep clone to a plain JS object to avoid mutating Mongoose documents
  const p = typeof product.toObject === "function" ? product.toObject() : JSON.parse(JSON.stringify(product));

  if (Array.isArray(p.images)) {
    p.images = p.images.map((img) => {
      if (img && img.url) {
        return { ...img, url: optimizeImageUrl(img.url, width) };
      }
      return img;
    });
  }

  if (Array.isArray(p.sizes)) {
    p.sizes = p.sizes.map((sz) => {
      if (sz && sz.image && sz.image.url) {
        return {
          ...sz,
          image: { ...sz.image, url: optimizeImageUrl(sz.image.url, width) }
        };
      }
      return sz;
    });
  }

  return p;
}
