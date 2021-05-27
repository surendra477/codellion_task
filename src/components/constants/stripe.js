const STRIPE_PUBLISHABLE = process.env.NODE_ENV === 'production'
  ? 'pk_test_qlBLJYatukp9GzUVuP0CRhG3'
  : 'pk_test_qlBLJYatukp9GzUVuP0CRhG3';

export default STRIPE_PUBLISHABLE;
