export interface ApiErrorResponse {
  message: string;
  code?: string;
  metadata: unknown;
  // Thêm các field khác tùy vào Backend của bạn
}

export interface ApiResponse {
  success: boolean;
  statusCode: number;
  message: string;
  metadata: {
    user: Record<string, string>;
    tokens: Record<string, string>;
  };
}
