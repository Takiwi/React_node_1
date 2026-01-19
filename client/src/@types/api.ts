export interface ApiErrorResponse {
  message: string;
  code?: string;
  metadata: unknown;
  // Thêm các field khác tùy vào Backend của bạn
}
