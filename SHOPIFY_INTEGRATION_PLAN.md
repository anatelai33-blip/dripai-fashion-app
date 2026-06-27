# DripAI Shopify Integration & Enhancement Plan

## 1. Current State Audit
The DripAI project currently consists of two main parts:
- **Frontend App (`/app`)**: A React/Vite application with a comprehensive UI for a fashion store, including features like AI Stylist, Try-On, Wardrobe, and Drip Score. It currently uses hardcoded mock data (`src/data/products.ts`) and Firebase for some backend services.
- **Admin Backend (`/dripai-admin`)**: An Express/Node.js backend intended to manage products, orders, and Cloudflare settings, using PostgreSQL.

There is an existing `shopifyService.ts` in the frontend that attempts to connect to Shopify via the Storefront API (GraphQL), but it is not fully integrated into the app's state management (`AppContext.tsx` and `productService.ts` still rely on Firebase/mock data).

## 2. Integration Strategy
The goal is to fully connect the DripAI frontend to the Shopify store (`dripaifashion.myshopify.com`) using the Shopify Storefront API, replacing the mock data and Firebase product/cart management.

### Key Integration Points:
1.  **Product Catalog**: Replace `products.ts` and Firebase `ProductService` with real-time data from Shopify via `shopifyService.ts`.
2.  **Cart Management**: Update `AppContext.tsx` and `CartService` to use Shopify's Checkout API instead of local state/Firebase.
3.  **Checkout Flow**: Implement the Shopify checkout URL redirection when users click "Proceed to Checkout" in the `CartScreen`.
4.  **Environment Configuration**: Ensure `.env` variables for Shopify Storefront API are correctly set up and documented.

## 3. Implementation Steps

### Step 1: Enhance `shopifyService.ts`
- Ensure the `getProducts` and `getProductById` methods correctly map Shopify's GraphQL responses to the app's `Product` interface.
- Verify the `createCheckout` method works and returns a valid `webUrl`.
- Add methods for updating and retrieving an existing checkout if needed.

### Step 2: Update `AppContext.tsx`
- Modify `fetchProducts` to call `ShopifyService.getProducts()` instead of `ProductService.getProducts()`.
- Update cart functions (`addToCart`, `removeFromCart`, `updateQuantity`) to interact with Shopify's Checkout API or maintain a local cart that syncs with Shopify upon checkout creation.
- *Decision*: For a smoother UX, we will maintain the cart in local state (as it currently is) and only create the Shopify Checkout when the user clicks "Proceed to Checkout".

### Step 3: Update `CartScreen.tsx`
- Modify the "Proceed to Checkout" button to call a new function that creates a Shopify checkout with the current cart items and redirects the user to the returned `webUrl`.

### Step 4: Update `HomeScreen.tsx` and other screens
- Ensure they use the products fetched from Shopify via `AppContext`.
- Handle loading states while products are being fetched.

### Step 5: Environment Setup
- Create a `.env` file in the `/app` directory with the necessary Shopify credentials (`VITE_SHOPIFY_STORE_URL` and `VITE_SHOPIFY_STOREFRONT_TOKEN`).

## 4. Enhancements
- **Real Products**: I have already created two sample products in the Shopify store ("DripAI Signature Leather Jacket" and "Coastal Linen Dress") to test the integration.
- **Error Handling**: Improve error handling in the Shopify service to gracefully degrade if the API is unavailable.

## 5. Execution
I will now proceed to modify the codebase according to this plan.
