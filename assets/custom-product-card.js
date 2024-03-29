class CustomProductCard extends HTMLElement {
    constructor() {
        super();
        this.productHandle = this.dataset.productHandle;
        console.log(this.productHandle)
        this.productId = this.dataset.productId;
        this.productUrl = this.dataset.productUrl;
        this.variantData = JSON.parse(this.querySelector('script').textContent);
        this.addEventListener('change', this.getVarientId)
    }

    getVarientId() {
        console.log(this.querySelectorAll('input[type="radio"]:checked'))
        this.varients = Array.from(this.querySelectorAll('input[type="radio"]:checked'), input => input.value);
        this.currentVarient = this.variantData.find(item => {
            return JSON.stringify(item.options) == JSON.stringify(this.varients)
        })
        console.log(this.currentVarient.id)
        this.getVarient(this.currentVarient.id)
    }

    getVarient(myVar) {
        const url = `/products/${this.productHandle}?variant=${myVar}&section_id=product-card-render`;
        fetch(url)
            .then(data => data.text())
            .then((content) => {
                console.log(content)
                const innerContent = new DOMParser().parseFromString(content, "text/html");
                this.innerHTML = innerContent.querySelector(`[data-product-handle='${this.productHandle}']`).innerHTML;
            })
    }
}

customElements.define('custom-product-card', CustomProductCard);