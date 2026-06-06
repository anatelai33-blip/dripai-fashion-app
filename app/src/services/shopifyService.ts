import type { Product } from '@/types';

const SHOPIFY_STORE_URL = import.meta.env.VITE_SHOPIFY_STORE_URL || '';
const SHOPIFY_STOREFRONT_TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN || '';

export class ShopifyService {
  private static async graphqlQuery(query: string, variables?: any): Promise<any> {
    const response = await fetch(`https://${SHOPIFY_STORE_URL}/api/2024-01/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_TOKEN
      },
      body: JSON.stringify({ query, variables })
    });

    if (!response.ok) {
      throw new Error(`Shopify API error: ${response.statusText}`);
    }

    const data = await response.json();
    
    if (data.errors) {
      throw new Error(data.errors[0].message);
    }

    return data.data;
  }

  // Get products from Shopify
  static async getProducts(first: number = 20, query?: string): Promise<Product[]> {
    const graphqlQuery = `
      query GetProducts($first: Int!, $query: String) {
        products(first: $first, query: $query) {
          edges {
            node {
              id
              title
              description
              images(first: 5) {
                edges {
                  node {
                    url
                    altText
                  }
                }
              }
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
              variants(first: 10) {
                edges {
                  node {
                    id
                    title
                    price {
                      amount
                    }
                    availableForSale
                  }
                }
              }
              productType
              tags
              metafields(identifiers: [{namespace: "custom", key: "tryOnEnabled"}]) {
                value
              }
            }
          }
        }
      }
    `;

    const data = await this.graphqlQuery(graphqlQuery, { first, query });
    
    return data.products.edges.map((edge: any) => this.mapShopifyProduct(edge.node));
  }

  // Get product by ID
  static async getProductById(productId: string): Promise<Product | null> {
    const graphqlQuery = `
      query GetProduct($id: ID!) {
        product(id: $id) {
          id
          title
          description
          images(first: 5) {
            edges {
              node {
                url
                altText
              }
            }
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          variants(first: 10) {
            edges {
              node {
                id
                title
                price {
                  amount
                }
                availableForSale
              }
            }
          }
          productType
          tags
        }
      }
    `;

    try {
      const data = await this.graphqlQuery(graphqlQuery, { id: productId });
      
      if (data.product) {
        return this.mapShopifyProduct(data.product);
      }
      
      return null;
    } catch (error) {
      console.error('Error fetching product:', error);
      return null;
    }
  }

  // Create checkout
  static async createCheckout(lineItems: { variantId: string; quantity: number }[]): Promise<{ id: string; webUrl: string }> {
    const graphqlQuery = `
      mutation CreateCheckout($input: CheckoutCreateInput!) {
        checkoutCreate(input: $input) {
          checkout {
            id
            webUrl
            lineItems(first: 10) {
              edges {
                node {
                  title
                  quantity
                }
              }
            }
            totalPrice {
              amount
              currencyCode
            }
          }
          checkoutUserErrors {
            message
            field
          }
        }
      }
    `;

    const input = {
      lineItems: lineItems.map(item => ({
        variantId: item.variantId,
        quantity: item.quantity
      }))
    };

    const data = await this.graphqlQuery(graphqlQuery, { input });
    
    if (data.checkoutCreate.checkoutUserErrors.length > 0) {
      throw new Error(data.checkoutCreate.checkoutUserErrors[0].message);
    }

    return {
      id: data.checkoutCreate.checkout.id,
      webUrl: data.checkoutCreate.checkout.webUrl
    };
  }

  // Map Shopify product to our Product type
  private static mapShopifyProduct(shopifyProduct: any): Product {
    const images = shopifyProduct.images.edges.map((edge: any) => edge.node.url);
    const variants = shopifyProduct.variants.edges.map((edge: any) => ({
      id: edge.node.id,
      title: edge.node.title,
      price: parseFloat(edge.node.price.amount),
      available: edge.node.availableForSale
    }));

    // Extract sizes from variant titles
    const sizes = [...new Set(variants.map((v: any) => v.title.split(' / ')[0] || 'One Size'))] as string[];
    
    // Extract colors from variant titles
    const colorSet = new Set<string>();
    variants.forEach((v: any) => {
      const parts = v.title.split(' / ');
      if (parts.length > 1) {
        colorSet.add(parts[1]);
      }
    });
    
    const colors = Array.from(colorSet).map(color => ({
      name: color,
      hex: this.getColorHex(color)
    }));

    // Check if try-on is enabled from metafields
    const tryOnEnabled = shopifyProduct.metafields?.[0]?.value === 'true' || false;

    return {
      id: shopifyProduct.id,
      name: shopifyProduct.title,
      price: parseFloat(shopifyProduct.priceRange.minVariantPrice.amount),
      rating: 4.5, // Default rating
      reviewCount: 0, // Would need separate review system
      images: images.length > 0 ? images : ['https://via.placeholder.com/600x800'],
      category: shopifyProduct.productType.toLowerCase() || 'clothing',
      sizes: sizes.length > 0 ? sizes : ['One Size'],
      colors: colors.length > 0 ? colors : [{ name: 'Default', hex: '#cccccc' }],
      description: shopifyProduct.description,
      inStock: variants.some((v: any) => v.available),
      tryOnEnabled
    };
  }

  // Get hex color from color name
  private static getColorHex(colorName: string): string {
    const colorMap: Record<string, string> = {
      'black': '#000000',
      'white': '#FFFFFF',
      'red': '#FF0000',
      'blue': '#0000FF',
      'green': '#008000',
      'yellow': '#FFFF00',
      'navy': '#000080',
      'gray': '#808080',
      'grey': '#808080',
      'beige': '#F5F5DC',
      'brown': '#8B4513',
      'pink': '#FFC0CB',
      'purple': '#800080',
      'orange': '#FFA500',
      'gold': '#D4AF37',
      'silver': '#C0C0C0'
    };

    return colorMap[colorName.toLowerCase()] || '#cccccc';
  }
}
