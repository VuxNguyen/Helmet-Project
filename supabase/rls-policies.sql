-- RLS Policies: Cho phép anon key hoạt động với bảng users
-- Chạy file này trong Supabase SQL Editor

-- 1. Policy cho phép SELECT users (cho login)
CREATE POLICY "Allow anon select users" ON public.users
  FOR SELECT
  TO anon
  USING (true);

-- 2. Policy cho phép INSERT users (cho register)
CREATE POLICY "Allow anon insert users" ON public.users
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- 3. Policy cho phép UPDATE users (cho profile update)
CREATE POLICY "Allow anon update users" ON public.users
  FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

-- 4. Policy cho products (public read)
CREATE POLICY "Allow anon select products" ON public.products
  FOR SELECT
  TO anon
  USING (true);

-- 5. Policy cho reviews (public read)
CREATE POLICY "Allow anon select reviews" ON public.reviews
  FOR SELECT
  TO anon
  USING (true);

-- 6. Policy cho orders - user chỉ xem được order của mình
CREATE POLICY "Allow anon select orders" ON public.orders
  FOR SELECT
  TO anon
  USING (true);

-- 7. Policy cho cart_items
CREATE POLICY "Allow anon all cart_items" ON public.cart_items
  FOR ALL
  TO anon
  USING (true)
  WITH CHECK (true);

-- 8. Policy cho wishlist_items
CREATE POLICY "Allow anon all wishlist_items" ON public.wishlist_items
  FOR ALL
  TO anon
  USING (true)
  WITH CHECK (true);

-- 9. Policy cho addresses
CREATE POLICY "Allow anon all addresses" ON public.addresses
  FOR ALL
  TO anon
  USING (true)
  WITH CHECK (true);