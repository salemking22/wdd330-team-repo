// 🧩 Card UI template
function CardTemplate(product) {
  const isDiscounted = product.FinalPrice < product.SuggestedRetailPrice;
  const badge = isDiscounted
    ? `<span class="discount-badge">Sale</span>`
    : "";

  const imageSrc = product.Images?.PrimaryMedium || "images/fallback.jpg";
  const price = product.FinalPrice?.toFixed(2) || "0.00";

  return `<li class="product-card">
    <a href="../../product_pages/index.html?product=${product.Id}" aria-label="View details for ${product.Name}">
      <div class="card-image-wrapper">
        <img
          src="${imageSrc}"
          alt="Image of ${product.Name}"
        />
        ${badge}
      </div>
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.Name}</h2>
      <p class="product-card__price">
        $${price}
      </p>
    </a>
  </li>`;
}

// 📦 ProductListing class
class ProductListing {
  constructor(dataSource, category, element) {
    this.dataSource = dataSource;
    this.category = category;
    this.element = element;
  }

  async init() {
    try {
      const list = await this.dataSource.getData();
      if (!list || list.length === 0) {
        this.element.innerHTML = `<p>No products found in ${this.category}.</p>`;
        return;
      }

      this.renderList(list);
    } catch (error) {
      console.error("🚨 Failed to load products:", error);
      this.element.innerHTML = `<p>Oops! Something went wrong while loading products.</p>`;
    }
  }

  renderList(list) {
    const html = list.map(CardTemplate).join("");
    this.element.innerHTML = `<ul class="product-list">${html}</ul>`;
  }
}

export default ProductListing;