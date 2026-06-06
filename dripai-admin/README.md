# DripAI Admin Panel

A comprehensive backend admin web interface for managing the DripAI website (dripai.store). Built with Node.js, Express, PostgreSQL, and integrated with Cloudflare API for DNS and domain management.

## Features

### Core Functionality
- **Secure Admin Authentication** - JWT + Session-based authentication with bcrypt password hashing
- **Product Management** - Full CRUD operations with image uploads, stock tracking, and categorization
- **Order Management** - Order creation, status tracking, payment management, and order history
- **Cloudflare Integration** - DNS record management, SSL/TLS configuration, cache purging
- **Settings Management** - Website configuration and customization
- **Activity Logging** - Comprehensive audit trail of all admin actions
- **Admin Management** - Multi-user support with role-based access control

### Security Features
- Helmet.js for security headers
- Express Rate Limiting for API protection
- CORS configuration
- SQL injection protection via parameterized queries
- XSS protection
- Secure session management
- Activity logging for audit trails

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **Authentication**: JWT + Express Session
- **File Uploads**: Multer
- **Security**: Helmet, bcryptjs, express-rate-limit
- **Frontend**: Vanilla HTML/CSS/JS (Single Page Application)

## Prerequisites

- Node.js 18+ 
- PostgreSQL 14+
- Cloudflare Account with API Token

## Installation

### 1. Clone and Install Dependencies

```bash
cd /mnt/okcomputer/output/dripai-admin
npm install
```

### 2. Configure Environment Variables

Edit the `.env` file with your actual credentials:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=dripai_admin
DB_USER=your_db_user
DB_PASSWORD=your_db_password

# Cloudflare API (Required for DNS management)
CLOUDFLARE_ZONE_ID=ffdf30a6142c9c45d7612e5e19a35001
CLOUDFLARE_ACCOUNT_ID=aea40ba4784483692d5290d9a53bdb66
CLOUDFLARE_API_TOKEN=your_actual_cloudflare_api_token

# Security (Change these in production!)
SESSION_SECRET=your_secure_random_string
JWT_SECRET=your_jwt_secret_key

# Admin Credentials (Change after first login)
ADMIN_EMAIL=admin@dripai.store
ADMIN_PASSWORD=YourSecurePassword123!
```

### 3. Initialize Database

```bash
npm run init-db
```

This will:
- Create the database if it doesn't exist
- Create all required tables
- Insert default settings
- Create the default admin user

### 4. Start the Server

**Development mode:**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The admin panel will be available at `http://localhost:3000/admin`

## API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout
- `POST /api/auth/change-password` - Change password
- `GET /api/auth/admins` - List all admins (superadmin only)
- `POST /api/auth/create-admin` - Create new admin (superadmin only)
- `PATCH /api/auth/admins/:id/toggle` - Toggle admin status (superadmin only)

### Products
- `GET /api/products` - List products with pagination/filters
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (with image uploads)
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product
- `PATCH /api/products/:id/featured` - Toggle featured status
- `PATCH /api/products/:id/stock` - Update stock quantity
- `POST /api/products/bulk-delete` - Bulk delete products

### Orders
- `GET /api/orders` - List orders with pagination/filters
- `GET /api/orders/:id` - Get single order with history
- `POST /api/orders` - Create order
- `PUT /api/orders/:id` - Update order
- `DELETE /api/orders/:id` - Delete order
- `PATCH /api/orders/:id/status` - Update order status
- `PATCH /api/orders/:id/payment` - Update payment status
- `PATCH /api/orders/:id/tracking` - Add tracking number
- `GET /api/orders/stats/overview` - Get order statistics

### Cloudflare
- `GET /api/cloudflare/zone` - Get zone details
- `GET /api/cloudflare/dns` - List DNS records
- `POST /api/cloudflare/dns` - Create DNS record (superadmin only)
- `PUT /api/cloudflare/dns/:id` - Update DNS record (superadmin only)
- `DELETE /api/cloudflare/dns/:id` - Delete DNS record (superadmin only)
- `GET /api/cloudflare/ssl` - Get SSL/TLS settings
- `PATCH /api/cloudflare/ssl` - Update SSL setting (superadmin only)
- `POST /api/cloudflare/cache/purge` - Purge cache
- `GET /api/cloudflare/cache/stats` - Get cache statistics
- `GET /api/cloudflare/cache/history` - Get cache purge history
- `GET /api/cloudflare/security` - Get security settings
- `PATCH /api/cloudflare/security/:setting` - Update security setting (superadmin only)

### Settings
- `GET /api/settings` - Get all settings
- `GET /api/settings/:key` - Get single setting
- `PUT /api/settings` - Update multiple settings
- `PUT /api/settings/:key` - Update single setting
- `POST /api/settings` - Create new setting (superadmin only)
- `DELETE /api/settings/:key` - Delete setting (superadmin only)
- `GET /api/settings/public/config` - Get public configuration

### Dashboard
- `GET /api/dashboard/overview` - Get dashboard overview data
- `GET /api/dashboard/analytics` - Get sales analytics
- `GET /api/dashboard/activity` - Get activity logs
- `GET /api/dashboard/health` - Get system health

## Database Schema

### Tables

**admins** - Admin users
- id, email, password_hash, name, role, last_login, created_at, updated_at, is_active

**products** - Products catalog
- id, name, description, price, compare_price, sku, stock_quantity, category, tags, images, status, featured, weight, dimensions, seo_title, seo_description, created_at, updated_at, created_by

**orders** - Customer orders
- id, order_number, customer_name, customer_email, customer_phone, shipping_address, billing_address, items, subtotal, shipping_cost, tax, total, currency, status, payment_status, payment_method, tracking_number, notes, created_at, updated_at

**order_status_history** - Order status changes
- id, order_id, status, notes, created_by, created_at

**settings** - Website settings
- id, key, value, type, description, updated_at, updated_by

**activity_logs** - Admin activity audit trail
- id, admin_id, action, entity_type, entity_id, details, ip_address, user_agent, created_at

**cloudflare_cache** - Cache purge history
- id, setting_type, setting_data, cached_at

## Cloudflare API Token Setup

1. Go to [Cloudflare API Tokens](https://dash.cloudflare.com/profile/api-tokens)
2. Click "Create Token"
3. Use the "Edit zone DNS" template or create custom token with:
   - Zone:Read
   - DNS:Edit
   - Zone Settings:Edit
   - Zone Analytics:Read
   - Cache Purge:Edit
4. Select your zone (dripai.store)
5. Copy the token and add to `.env` file

## Deployment

### Using PM2 (Recommended)

```bash
# Install PM2 globally
npm install -g pm2

# Start the application
pm2 start src/server.js --name dripai-admin

# Save PM2 config
pm2 save
pm2 startup
```

### Using Docker

```bash
# Build image
docker build -t dripai-admin .

# Run container
docker run -d \
  -p 3000:3000 \
  --env-file .env \
  --name dripai-admin \
  dripai-admin
```

### Nginx Reverse Proxy

```nginx
server {
    listen 80;
    server_name admin.dripai.store;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Security Checklist

- [ ] Change default admin password after first login
- [ ] Use strong SESSION_SECRET and JWT_SECRET in production
- [ ] Enable HTTPS in production
- [ ] Configure firewall rules
- [ ] Regular database backups
- [ ] Monitor activity logs
- [ ] Keep dependencies updated
- [ ] Use Cloudflare for DDoS protection

## Default Login Credentials

**Email:** admin@dripai.store  
**Password:** DripAI2024!Secure

> ⚠️ **IMPORTANT:** Change the default password immediately after first login!

## Troubleshooting

### Database Connection Issues
```bash
# Test PostgreSQL connection
psql -U postgres -d dripai_admin -c "SELECT 1"
```

### Reset Database
```bash
# Drop and recreate database
psql -U postgres -c "DROP DATABASE IF EXISTS dripai_admin"
npm run init-db
```

### Check Logs
```bash
# View PM2 logs
pm2 logs dripai-admin

# View application logs
tail -f logs/app.log
```

## License

Private - For DripAI use only

## Support

For technical support, contact the development team.
