interface PropiedadFilter {
  title?: RegExp;
  category?: RegExp;
  listingType?: RegExp;
  baths?: number;
  rooms?: number;
  price?: {
    $gte?: number;
    $lte?: number;
  };
}

export { PropiedadFilter }