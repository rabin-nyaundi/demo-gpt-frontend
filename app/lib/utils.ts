const environment: string | undefined = process?.env?.NEXT_PUBLIC_ENVIRONMENT;

export function getBackendUrl() {
  const backendUrl: string =
    environment === "development"
      ? process.env.NEXT_PUBLIC_DEV_BACKEND_URL || "http://localhost:8000"
      : process.env.NEXT_PUBLIC_PROD_BACKEND_URL || "";
  return "http://localhost:8000/api";
}
