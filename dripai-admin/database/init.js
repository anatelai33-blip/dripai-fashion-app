const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: 'postgres', // Connect to default postgres db first
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
});

async function initDatabase() {
  try {
    console.log('🚀 Initializing DripAI Admin Database...\n');

    // Create database if not exists
    const dbName = process.env.DB_NAME || 'dripai_admin';
    const checkDb = await pool.query(
      "SELECT 1 FROM pg_database WHERE datname = $1",
      [dbName]
    );

    if (checkDb.rowCount === 0) {
      await pool.query(`CREATE DATABASE ${dbName}`);
      console.log(`✅ Database '${dbName}' created successfully`);
    } else {
      console.log(`ℹ️ Database '${dbName}' already exists`);
    }

    // Close connection to postgres db
    await pool.end();

    // Connect to the new database
    const appPool = new Pool({
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 5432,
      database: dbName,
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
    });

    // Create tables
    console.log('\n📊 Creating tables...\n');

    // Admins table
    await appPool.query(`
      CREATE TABLE IF NOT EXISTS admins (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'admin',
        last_login TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        is_active BOOLEAN DEFAULT true
      )
    `);
    console.log('✅ admins table created');

    // Products table
    await appPool.query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        price DECIMAL(10, 2) NOT NULL,
        compare_price DECIMAL(10, 2),
        sku VARCHAR(100) UNIQUE,
        stock_quantity INTEGER DEFAULT 0,
        category VARCHAR(100),
        tags TEXT[],
        images TEXT[],
        status VARCHAR(50) DEFAULT 'active',
        featured BOOLEAN DEFAULT false,
        weight DECIMAL(8, 2),
        dimensions JSONB,
        seo_title VARCHAR(255),
        seo_description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        created_by INTEGER REFERENCES admins(id)
      )
    `);
    console.log('✅ products table created');

    // Orders table
    await appPool.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        order_number VARCHAR(50) UNIQUE NOT NULL,
        customer_name VARCHAR(255) NOT NULL,
        customer_email VARCHAR(255) NOT NULL,
        customer_phone VARCHAR(50),
        shipping_address JSONB NOT NULL,
        billing_address JSONB,
        items JSONB NOT NULL,
        subtotal DECIMAL(10, 2) NOT NULL,
        shipping_cost DECIMAL(10, 2) DEFAULT 0,
        tax DECIMAL(10, 2) DEFAULT 0,
        total DECIMAL(10, 2) NOT NULL,
        currency VARCHAR(10) DEFAULT 'NGN',
        status VARCHAR(50) DEFAULT 'pending',
        payment_status VARCHAR(50) DEFAULT 'pending',
        payment_method VARCHAR(50),
        tracking_number VARCHAR(100),
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ orders table created');

    // Order status history table
    await appPool.query(`
      CREATE TABLE IF NOT EXISTS order_status_history (
        id SERIAL PRIMARY KEY,
        order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
        status VARCHAR(50) NOT NULL,
        notes TEXT,
        created_by INTEGER REFERENCES admins(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ order_status_history table created');

    // Website settings table
    await appPool.query(`
      CREATE TABLE IF NOT EXISTS settings (
        id SERIAL PRIMARY KEY,
        key VARCHAR(100) UNIQUE NOT NULL,
        value TEXT,
        type VARCHAR(50) DEFAULT 'string',
        description TEXT,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_by INTEGER REFERENCES admins(id)
      )
    `);
    console.log('✅ settings table created');

    // Activity logs table
    await appPool.query(`
      CREATE TABLE IF NOT EXISTS activity_logs (
        id SERIAL PRIMARY KEY,
        admin_id INTEGER REFERENCES admins(id),
        action VARCHAR(100) NOT NULL,
        entity_type VARCHAR(50),
        entity_id INTEGER,
        details JSONB,
        ip_address INET,
        user_agent TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ activity_logs table created');

    // Cloudflare settings cache table
    await appPool.query(`
      CREATE TABLE IF NOT EXISTS cloudflare_cache (
        id SERIAL PRIMARY KEY,
        setting_type VARCHAR(100) NOT NULL,
        setting_data JSONB NOT NULL,
        cached_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ cloudflare_cache table created');

    // Insert default settings
    await appPool.query(`
      INSERT INTO settings (key, value, description) VALUES
      ('site_name', 'DripAI', 'Website name'),
      ('site_description', 'Digital Innovation Company', 'Website description'),
      ('contact_email', 'hello@dripai.store', 'Contact email'),
      ('contact_phone', '+234 805 391 6889', 'Contact phone'),
      ('currency', 'NGN', 'Default currency'),
      ('tax_rate', '0', 'Tax rate percentage'),
      ('shipping_cost', '0', 'Default shipping cost')
      ON CONFLICT (key) DO NOTHING
    `);
    console.log('✅ Default settings inserted');

    // Create default admin user
    const bcrypt = require('bcryptjs');
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@dripai.store';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
    const passwordHash = await bcrypt.hash(adminPassword, 12);

    await appPool.query(`
      INSERT INTO admins (email, password_hash, name, role)
      VALUES ($1, $2, 'Super Admin', 'superadmin')
      ON CONFLICT (email) DO NOTHING
    `, [adminEmail, passwordHash]);
    console.log('✅ Default admin user created');

    // Create indexes for better performance
    await appPool.query(`CREATE INDEX IF NOT EXISTS idx_products_status ON products(status)`);
    await appPool.query(`CREATE INDEX IF NOT EXISTS idx_products_category ON products(category)`);
    await appPool.query(`CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status)`);
    await appPool.query(`CREATE INDEX IF NOT EXISTS idx_orders_customer_email ON orders(customer_email)`);
    await appPool.query(`CREATE INDEX IF NOT EXISTS idx_activity_logs_admin_id ON activity_logs(admin_id)`);
    await appPool.query(`CREATE INDEX IF NOT EXISTS idx_activity_logs_created_at ON activity_logs(created_at)`);
    console.log('✅ Indexes created');

    console.log('\n🎉 Database initialization complete!');
    console.log(`\n📧 Default admin: ${adminEmail}`);
    console.log(`🔑 Default password: ${adminPassword}`);
    console.log('\n⚠️  IMPORTANT: Change the default password after first login!');

    await appPool.end();
    process.exit(0);

  } catch (error) {
    console.error('❌ Database initialization failed:', error.message);
    process.exit(1);
  }
}

initDatabase();
