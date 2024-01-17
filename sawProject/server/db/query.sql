CREATE TABLE
  products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    image BLOB,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    availability BOOLEAN NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  );

CREATE TABLE
  spaceships (
    product_id INT PRIMARY KEY,
    fuel_type VARCHAR(50),
    capacity INT,
    FOREIGN KEY (product_id) REFERENCES products (id)
  );

CREATE TABLE
  spacesuits (
    product_id INT PRIMARY KEY,
    size VARCHAR(20),
    material VARCHAR(50),
    FOREIGN KEY (product_id) REFERENCES products (id)
  );

CREATE TABLE
  space_parts (
    product_id INT PRIMARY KEY,
    category VARCHAR(50),
    manufacturer VARCHAR(100),
    FOREIGN KEY (product_id) REFERENCES products (id)
  );

CREATE TABLE
  engines (
    product_id INT PRIMARY KEY,
    thrust_power DECIMAL(10, 2),
    fuel_efficiency DECIMAL(5, 2),
    FOREIGN KEY (product_id) REFERENCES products (id)
  );

CREATE TABLE
  navigation_systems (
    product_id INT PRIMARY KEY,
    gps_accuracy DECIMAL(5, 2),
    compatibility VARCHAR(100),
    FOREIGN KEY (product_id) REFERENCES products (id)
  );

CREATE TABLE
  life_support_systems (
    product_id INT PRIMARY KEY,
    oxygen_capacity INT,
    temperature_regulation BOOLEAN,
    FOREIGN KEY (product_id) REFERENCES products (id)
  );

CREATE TABLE
  spacecraft_components (
    product_id INT PRIMARY KEY,
    component_type VARCHAR(50),
    manufacturer VARCHAR(100),
    FOREIGN KEY (product_id) REFERENCES products (id)
  );

CREATE TABLE
  users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

CREATE TABLE
  orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total_amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'Pending',
    FOREIGN KEY (user_id) REFERENCES users (id)
  );

CREATE TABLE
  order_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT,
    product_id INT,
    quantity INT NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders (id),
    FOREIGN KEY (product_id) REFERENCES products (id)
  );

CREATE TABLE
  reviews (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    product_id INT,
    rating INT NOT NULL,
    comment TEXT,
    review_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (product_id) REFERENCES products (id)
  );

CREATE TABLE
  addresses (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    address_line1 VARCHAR(255),
    address_line2 VARCHAR(255),
    city VARCHAR(100),
    postal_code VARCHAR(20),
    country VARCHAR(100),
    FOREIGN KEY (user_id) REFERENCES users (id)
  );

CREATE TABLE
  sessions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    session_token VARCHAR(255) UNIQUE NOT NULL,
    expiration_date TIMESTAMP NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id)
  );

CREATE TABLE
  shopping_cart (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    product_id INT,
    quantity INT NOT NULL,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (product_id) REFERENCES products (id)
  );

CREATE TABLE
  wishlist (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    wishlist_token VARCHAR(255) UNIQUE,
    product_id INT,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (product_id) REFERENCES products (id)
  );

CREATE TABLE
  wishlist_collaborators (
    id INT PRIMARY KEY AUTO_INCREMENT,
    wishlist_id INT,
    collaborator_id INT,
    can_edit BOOLEAN,
    FOREIGN KEY (wishlist_id) REFERENCES wishlist (id),
    FOREIGN KEY (collaborator_id) REFERENCES users (id)
  );