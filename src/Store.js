import { useState, useEnv } from "@odoo/owl";

export function useStore() {
  const env = useEnv();
  return useState(env.store);
}
