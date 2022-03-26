import Link from 'next/link';
import Image from 'next/image';
import { Flex, Row, Text, Button, Box } from '@chakra-ui/react';

import { baseUrl, fetchApi } from '../utils/fetchApi';
import Property from '../components/Property';

const Banner = ({
  purpose,
  title,
  title2,
  desc1,
  desc2,
  buttonText,
  linkName,
  imageUrl,
  link,
}) => (
  <Flex
    flexWrap="wrap"
    justifyContent="center"
    alignItems="center"
    flexDirection="row"
    m={[8, 5]}
  >
    <Box
      flexGrow={1}
      cursor="pointer"
      display={{
        base: 'none',
        sm: 'none',
        md: 'block',
        lg: 'block',
        xl: 'block',
      }}
    >
      <Link
        href={`/search?purpose=for-${
          link === 'buy' ? 'sale' : 'rent'
        }`}
        passHref
      >
        <Image
          src={imageUrl}
          width={600}
          height={300}
          alt="banner"
          layout="responsive"
          style={{ objectFit: 'cover', cursor: 'pointer' }}
          placeholder="blur"
          blurDataURL="../assets/images/placeholder.png"
        />
      </Link>
    </Box>
    <Box
      p="5"
      textAlign={{
        base: 'center',
        sm: 'center',
        md: 'left',
        lg: 'left',
        xl: 'left',
      }}
    >
      <Text color="gray.500" fontSize="sm" fontWeight="medium">
        {purpose}
      </Text>
      <Text fontSize="3xl" fontWeight="bold">
        {title}
        <br />
        {title2}
      </Text>
      <Text
        fontSize="lg"
        paddingTop="3"
        paddingBottom="3"
        color="gray.700"
      >
        {desc1}
        <br />
        {desc2}
      </Text>
      <Button fontSize="xl">
        <Link href={linkName}>{buttonText}</Link>
      </Button>
    </Box>
  </Flex>
);

export default function Home({
  propertiesForRent,
  propertiesForSale,
}) {
  return (
    <Box>
      <Banner
        purpose="RENT A HOME"
        title="Rental Homes for"
        title2="Everyone"
        desc1="Explore Apartments, Villas, Homes"
        desc2="and more"
        buttonText="Explore Renting"
        linkName="/search?purpose-for-rent"
        imageUrl="https://wallpapercave.com/wp/wp2449358.jpg"
        link="rent"
      />
      <Flex flexWrap="wrap">
        {propertiesForRent.map((property) => (
          <Property property={property} key={property.id} />
        ))}
      </Flex>
      <Banner
        purpose="BUY A HOME"
        title="Find, Buy & Own Your"
        title2="Dream Home"
        desc1="Explore Apartments, Villas, Homes"
        desc2="and more"
        buttonText="Explore Buying"
        linkName="/search?purpose-for-sale"
        imageUrl="https://images.unsplash.com/photo-1549517045-bc93de075e53?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGhvbWV8ZW58MHx8MHx8&w=1000&q=80"
        link="buy"
      />
      <Flex flexWrap="wrap">
        {propertiesForSale.map((property) => (
          <Property property={property} key={property.id} />
        ))}
      </Flex>
    </Box>
  );
}

export async function getStaticProps() {
  const propertyForSale = await fetchApi(
    `${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`,
  );
  const propertyForRent = await fetchApi(
    `${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`,
  );

  return {
    props: {
      propertiesForRent: propertyForRent?.hits,
      propertiesForSale: propertyForSale?.hits,
    },
  };
}
