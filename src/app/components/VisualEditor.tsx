"use client";

import { useEffect } from "react";
import { apply } from "@directus/visual-editing";

export default function VisualEditor() {
  useEffect(() => {
    const init = async () => {
      await apply({
        directusUrl: process.env.NEXT_PUBLIC_DIRECTUS_URL || "http://57.128.243.135:8055",
      });
    };
    init();
  }, []);

  return null;
}
