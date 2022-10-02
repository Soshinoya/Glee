class ProductService {

    constructor(products = []) {
        this.products = products
    }

    filterByTitle(search = '') {
        if (!search.trim()) return this.products;

        return this.products.filter(product => {
            return product.title.toLowerCase().includes(search.toLowerCase())
        })
    }

    filterBy(category = [], brand = '', min = 0, max = 0) {
        let filteredProducts = this.products.slice();

        if (category.length !== 0) {
            filteredProducts = filteredProducts.filter(product => {
                for (let i = 0; i < category.length; i++) {
                    if (product.category === category[i]) {
                        return product;
                    };
                };
            });
        };

        filteredProducts = filteredProducts.filter(product => {
            if (min <= product.price && max >= product.price) {
                return product;
            };
        });

        if (brand) {
            filteredProducts = filteredProducts.filter(product => {
                if (product.brand === brand) {
                    return product;
                };
            });
        };

        if (category === [] && brand === '') {
            console.log('brand and category default');
            return this.products;
        };

        return filteredProducts;
    };

    get(index) {
        return this.products[index]
    }

    getBySku(sku) {
        return this.products.find(product => {
            return product.sku === sku
        })
    }
}