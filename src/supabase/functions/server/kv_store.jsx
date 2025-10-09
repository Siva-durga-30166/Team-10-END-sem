import { createClient } from "@supabase/supabase-js";


const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY =
  import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_SERVICE_ROLE_KEY;

const client = () => createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

// ---------- CRUD functions ----------

// Set a key-value pair
export const set = async (key, value) => {
  const supabase = client();
  const { error } = await supabase.from("kv_store_cac4bc10").upsert({
    key,
    value,
  });
  if (error) throw new Error(error.message);
};

// Get a value by key
export const get = async (key) => {
  const supabase = client();
  const { data, error } = await supabase
    .from("kv_store_cac4bc10")
    .select("value")
    .eq("key", key)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return data?.value;
};

// Delete a key
export const del = async (key) => {
  const supabase = client();
  const { error } = await supabase.from("kv_store_cac4bc10").delete().eq("key", key);
  if (error) throw new Error(error.message);
};

// Set multiple key-value pairs
export const mset = async (keys, values) => {
  const supabase = client();
  const entries = keys.map((k, i) => ({ key: k, value: values[i] }));
  const { error } = await supabase.from("kv_store_cac4bc10").upsert(entries);
  if (error) throw new Error(error.message);
};

// Get multiple keys
export const mget = async (keys) => {
  const supabase = client();
  const { data, error } = await supabase
    .from("kv_store_cac4bc10")
    .select("value")
    .in("key", keys);
  if (error) throw new Error(error.message);
  return data?.map((d) => d.value) ?? [];
};

// Delete multiple keys
export const mdel = async (keys) => {
  const supabase = client();
  const { error } = await supabase.from("kv_store_cac4bc10").delete().in("key", keys);
  if (error) throw new Error(error.message);
};

// Get by prefix
export const getByPrefix = async (prefix) => {
  const supabase = client();
  const { data, error } = await supabase
    .from("kv_store_cac4bc10")
    .select("key, value")
    .like("key", `${prefix}%`);
  if (error) throw new Error(error.message);
  return data?.map((d) => d.value) ?? [];
};
