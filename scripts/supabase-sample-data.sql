-- Clear existing data (optional - remove if you want to keep existing data)
TRUNCATE TABLE order_items, orders, products, categories, sales_analytics, support_questions RESTART IDENTITY CASCADE;

-- Insert categories
INSERT INTO categories (name, description) VALUES
('T-Shirts', 'Comfortable and stylish t-shirts for all occasions'),
('Hoodies', 'Stay warm and fashionable with our premium hoodies'),
('Sweatshirts', 'Cozy sweatshirts for casual wear'),
('Caps', 'Stylish caps to complete your look'),
('Custom Prints', 'Custom designed prints for your apparel');

-- Insert products
INSERT INTO products (name, description, price, stock_count, category_id, image_url) VALUES
('Classic White Tee', 'A timeless classic white t-shirt made from 100% organic cotton. Perfect for everyday wear or as a base for custom designs.', 24.99, 50, 1, 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'),
('Vintage Black Tee', 'Soft and comfortable black t-shirt with a vintage feel. Pre-shrunk and fade-resistant for long-lasting wear.', 29.99, 35, 1, 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'),
('Urban Hoodie', 'Premium quality hoodie perfect for urban lifestyle. Features a kangaroo pocket and adjustable drawstring hood.', 49.99, 20, 2, 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'),
('Tech Sweatshirt', 'Modern sweatshirt with tech-inspired design. Moisture-wicking fabric keeps you comfortable all day.', 39.99, 15, 3, 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'),
('Snapback Cap', 'Adjustable snapback cap with embroidered logo. One size fits most with structured crown and flat visor.', 19.99, 40, 4, 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'),
('Custom Logo Tee', 'T-shirt with your custom logo printed on demand. High-quality direct-to-garment printing for vibrant colors.', 34.99, 0, 5, 'https://images.unsplash.com/photo-1562157873-818bc0726f68?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'),
('Premium Zip Hoodie', 'High-quality zip hoodie for maximum comfort. Features YKK zipper and reinforced seams for durability.', 59.99, 8, 2, 'https://images.unsplash.com/photo-1542406775-ade58c52cf3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'),
('Graphic Print Tee', 'T-shirt with artistic graphic print. Unique designs created by our in-house artists.', 32.99, 25, 1, 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'),
('Minimalist Sweatshirt', 'Clean and simple design sweatshirt. Perfect for those who prefer understated elegance.', 44.99, 18, 3, 'https://images.unsplash.com/photo-1556754573-d8245ddd997e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'),
('Trucker Cap', 'Classic trucker cap with mesh back. Breathable design perfect for outdoor activities.', 22.99, 30, 4, 'https://images.unsplash.com/photo-1534215754734-18e55d13e346?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'),
('Eco-friendly Tee', 'Sustainable t-shirt made from recycled materials. Soft, comfortable, and environmentally conscious.', 27.99, 22, 1, 'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'),
('Limited Edition Hoodie', 'Exclusive design with limited availability. Premium materials and unique colorway.', 69.99, 5, 2, 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'),
('Performance Tee', 'Athletic performance t-shirt with moisture-wicking technology. Perfect for workouts and active lifestyle.', 31.99, 45, 1, 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'),
('Cozy Pullover', 'Ultra-soft pullover sweatshirt. Perfect for lounging or casual outings.', 42.99, 28, 3, 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'),
('Baseball Cap', 'Classic baseball cap with adjustable strap. Timeless design that never goes out of style.', 18.99, 55, 4, 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80');

-- Insert orders
INSERT INTO orders (customer_name, customer_email, total_amount, status) VALUES
('John Smith', 'john.smith@example.com', 74.97, 'Completed'),
('Emily Johnson', 'emily.j@example.com', 49.99, 'Processing'),
('Michael Brown', 'michael.b@example.com', 89.98, 'Completed'),
('Sarah Wilson', 'sarah.w@example.com', 22.99, 'Shipped'),
('David Lee', 'david.lee@example.com', 129.97, 'Completed'),
('Jennifer Garcia', 'jen.garcia@example.com', 34.99, 'Processing'),
('Robert Martinez', 'robert.m@example.com', 59.99, 'Shipped'),
('Lisa Anderson', 'lisa.a@example.com', 65.98, 'Completed'),
('Mark Thompson', 'mark.t@example.com', 92.97, 'Processing'),
('Amanda Davis', 'amanda.d@example.com', 41.98, 'Shipped');

-- Insert order items
INSERT INTO order_items (order_id, product_id, quantity, price) VALUES
(1, 1, 1, 24.99),
(1, 5, 1, 19.99),
(1, 11, 1, 29.99),
(2, 3, 1, 49.99),
(3, 7, 1, 59.99),
(3, 10, 1, 29.99),
(4, 5, 1, 22.99),
(5, 3, 1, 49.99),
(5, 4, 1, 39.99),
(5, 8, 1, 39.99),
(6, 6, 1, 34.99),
(7, 7, 1, 59.99),
(8, 1, 1, 24.99),
(8, 11, 1, 40.99),
(9, 2, 2, 29.99),
(9, 13, 1, 31.99),
(10, 14, 1, 42.99);

-- Insert sales analytics (last 30 days)
INSERT INTO sales_analytics (date, total_sales, total_orders, avg_order_value) VALUES
('2024-01-01', 245.50, 3, 81.83),
('2024-01-02', 189.97, 2, 94.99),
('2024-01-03', 310.45, 4, 77.61),
('2024-01-04', 159.98, 2, 79.99),
('2024-01-05', 425.75, 5, 85.15),
('2024-01-06', 199.96, 3, 66.65),
('2024-01-07', 349.92, 4, 87.48),
('2024-01-08', 275.50, 3, 91.83),
('2024-01-09', 199.97, 2, 99.99),
('2024-01-10', 399.95, 5, 79.99),
('2024-01-11', 149.97, 2, 74.99),
('2024-01-12', 329.94, 4, 82.49),
('2024-01-13', 219.96, 3, 73.32),
('2024-01-14', 289.95, 3, 96.65),
('2024-01-15', 379.92, 4, 94.98),
('2024-01-16', 259.97, 3, 86.66),
('2024-01-17', 419.93, 5, 83.99),
('2024-01-18', 179.98, 2, 89.99),
('2024-01-19', 339.94, 4, 84.99),
('2024-01-20', 229.97, 3, 76.66),
('2024-01-21', 299.95, 3, 99.98),
('2024-01-22', 389.92, 4, 97.48),
('2024-01-23', 269.97, 3, 89.99),
('2024-01-24', 429.93, 5, 85.99),
('2024-01-25', 189.98, 2, 94.99),
('2024-01-26', 349.94, 4, 87.49),
('2024-01-27', 239.97, 3, 79.99),
('2024-01-28', 309.95, 3, 103.32),
('2024-01-29', 399.92, 4, 99.98),
('2024-01-30', 279.97, 3, 93.32);

-- Insert support questions
INSERT INTO support_questions (question, answer) VALUES
('How do I track my order?', 'You can track your order by logging into your account and visiting the "Order History" section. There you will find tracking information for all your recent orders. You can also use the tracking number provided in your confirmation email on our website or the carrier''s website.'),
('What is your return policy?', 'We offer a 30-day return policy for all unworn and unwashed items with original tags attached. Items must be in their original condition. Custom printed items can only be returned if there was an error in production. Please contact our customer service team to initiate a return and receive a prepaid return label.'),
('Do you offer custom designs?', 'Yes! We offer comprehensive custom design services for all our apparel products. You can upload your own design during the ordering process, or work with our professional design team to create something unique. We support various file formats including PNG, JPG, PDF, and vector files.'),
('How long does shipping take?', 'Standard shipping typically takes 3-5 business days within the continental US. Express shipping (1-2 business days) and overnight shipping options are available at checkout for faster delivery. International shipping times vary by location, typically 7-14 business days.'),
('What sizes do you offer?', 'We offer a comprehensive range of sizes from XS to 5XL for most of our products. Each product page includes a detailed sizing chart with measurements. We also offer youth and toddler sizes for select items. If you need help choosing the right size, our customer service team is happy to assist.'),
('Are your products eco-friendly?', 'Many of our products are made from sustainable and eco-friendly materials including organic cotton, recycled polyester, and bamboo blends. We use water-based inks that are environmentally safe and OEKO-TEX certified materials. Look for the "Eco-Friendly" tag on product pages to identify these items.'),
('How do I care for my printed apparel?', 'To preserve the quality and longevity of your printed apparel, we recommend washing inside out in cold water (30°C or below), using mild detergent, and hanging to dry or tumble dry on low heat. Avoid bleach, fabric softeners, and ironing directly on the print. Following these care instructions will help maintain vibrant colors and prevent cracking.'),
('Can I modify my order after placing it?', 'Order modifications are possible within 1 hour of placing your order, as we begin production quickly to ensure fast delivery. After this window, changes may not be possible depending on the production stage. Please contact our customer service team immediately at (555) 123-4567 if you need to make changes.'),
('Do you ship internationally?', 'Yes, we ship to over 50 countries worldwide. International shipping rates and delivery times vary by location and can be calculated at checkout. Please note that international orders may be subject to customs duties and taxes, which are the responsibility of the recipient. We provide all necessary customs documentation.'),
('What payment methods do you accept?', 'We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, Apple Pay, Google Pay, and Shop Pay. For bulk orders over $1,000, we also offer net payment terms for qualified business customers. All payments are securely processed using industry-standard encryption and we never store your payment information.');
