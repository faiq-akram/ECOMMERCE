export class product {
    productName!: string;
    description!: string;
    price!: number;
    imageUrl!: string;
}

export class cart {
    productId!: number;
    quantity!: number;
    userId!: number;
}

export class purchase {
    userId!: number;
    productId!: number;
    totalAmount!: number;
}