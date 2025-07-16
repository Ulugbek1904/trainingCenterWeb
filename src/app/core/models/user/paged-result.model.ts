export interface PagedResult<UserDto> {
  items: UserDto[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
}
