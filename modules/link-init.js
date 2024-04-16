module.exports = {
  admin: {
    index  : [],
    main   : [
      {
        path  : '/admin/main',
        link  : '/admin/main',
        status: 2,
        src   : 'home',
        name  : '홈',
      },
      {
        path  : '/admin/user',
        link  : '/admin/user',
        status: 7,
        src   : 'person',
        name  : '회원관리',
      },
      {
        path: '/admin/cate',
        link: '/admin/cate',
        src : 'account_tree',
        name  : '카테고리 관리',
      },
      {
        path: '/admin/prd',
        link: '/admin/prd',
        src : 'inventory_2',
        name  : '제품관리',
      },
      {
        path: ['/admin/review', '/admin/section'],
        link: '/admin/review',
        src : 'photo_camera',
        name  : '설치사례관리',
      },
      /* {
        path  : '/admin/order',
        link  : '/admin/order',
        status: 7,
        src   : 'payment',
        name  : '주문관리',
      }, */
      {
        path: ['/admin/board', '/admin/binit'],
        link: '/admin/binit',
        src : 'assignment',
        name  : '게시판관리',
      },
      /* {
        path: '/admin/system',
        link: '/admin/system',
        src: 'b6',
      }, */
      {
        path  : '//analytics.google.com',
        link  : '//analytics.google.com',
        src   : 'analytics',
        target: '_blank',
        name  : '접속통계',
      },
    ],
    user   : [{ path: '/admin/user', name: '회원 관리' }],
    order  : [{ path: '/admin/order', name: '주문 관리' }],
    cate  : [{ path: '/admin/cate', name: '카테고리 관리' }],
    prd    : [
      { path: '/admin/prd', name: '제품 관리' },
    ],
    review   : [
      { path: '/admin/review', name: '설치사례 관리' },
      { path: '/admin/section', name: '제품 분류 관리' },
    ],
    section: [
      { path: '/admin/review', name: '설치사례 관리' },
      { path: '/admin/section', name: '설치사례 분류 관리' },
    ],
    /* color  : [
      { path: '/admin/cate', name: '카테고리 관리' },
      { path: '/admin/prd', name: '제품 관리' },
      { path: '/admin/section', name: '제품 분류 관리' },
      { path: '/admin/color', name: '제품 색상 관리' },
    ], */
    binit  : [
      { path: '/admin/binit', name: '게시판 관리' },
      { path: '/admin/board', name: '게시물 관리' },
    ],
    board  : [
      { path: '/admin/binit', name: '게시판 관리' },
      { path: '/admin/board', name: '게시물 관리' },
    ],
  },
};
