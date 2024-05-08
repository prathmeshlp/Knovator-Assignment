import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/productsAPI";

const ProductCard = ({ product }) => {
  // console.log(product,"product");

  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    // console.log(id,"id");
    dispatch(addToCart(product));
    toast.success("Item Added to Cart");
  };

  return (
    <div className="product_card">
      <Card>
        <CardBody>
          <Image src={product.image} alt={product.name} borderRadius="lg" 
            width={200}
          />
          <Stack mt="6" spacing="3">
            <Heading size="md">{product.name}</Heading>
            <Text>{product.description}</Text>
            <Text color="blue.600" fontSize="2xl">
              Price: {product.price}
            </Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup spacing="2">
            <Button
              onClick={() => handleAddToCart(product)}
              variant="solid"
              colorScheme="blue"
            >
              Add to cart
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProductCard;
