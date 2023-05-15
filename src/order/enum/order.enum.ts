export enum YesOrNo {
  'Y','N'
}

export enum OrderStatus {
  N = 'N', //배송처리 전
  S = 'S', //발송준비
  Y = 'Y', //발송완료
  D = 'D', //취소요청
  C = 'C', //주문취소
  R = 'R', //반송
  X = 'X', //배송요청
  P = 'P', //부분배송
  E = 'E', //환불대기
  Q = 'Q', //부분배송준비
}