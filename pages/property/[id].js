import React, { Fragment } from 'react';
import { Box, Flex, Spacer, Text, Avatar } from '@chakra-ui/react';
import { FaBed, FaBath } from 'react-icons/fa';
import { BsGridFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';
import millify from 'millify';
import { motion } from 'framer-motion';
import { fetchApi, baseUrl } from '../../utils/fetchApi';
import ImageScrollbar from '../../components/ImageScrollbar';

const PropertyDetails = ({
  propertyDetails: {
    price,
    rentFrequency,
    rooms,
    title,
    baths,
    area,
    agency,
    isVerified,
    description,
    purpose,
    type,
    furnishingStatus,
    amenities,
    photos,
  },
}) => {
  const MotionText = motion(Text);
  return (
    <Box maxWidth={'1000px'} margin="auto" p="4">
      {photos && <ImageScrollbar data={photos} />}
      <Box width="full" p="6">
        <Flex
          paddingTop={2}
          alignItems="center"
          justifyContent="space-between"
        >
          <Flex alignItems="center">
            {isVerified && (
              <Box paddingRight="3" color="green.400">
                <GoVerified />
              </Box>
            )}
            <Text fontWeight="bold" fontSize="lg">
              AED {millify(price)}
              {rentFrequency && ` / ${rentFrequency}`}
            </Text>
          </Flex>
          <Box>
            <Avatar size="sm" src={agency?.logo?.url} />
          </Box>
        </Flex>
        <Flex
          alignItems="center"
          justifyContent="flex-start"
          w="250px"
          color="blue.400"
        >
          <Box>
            <Text
              display="flex"
              alignItems="center"
              w="50px"
              justifyContent="space-around"
            >
              {rooms} <FaBed /> |
            </Text>
          </Box>
          <Box>
            <Box>
              <Text
                display="flex"
                alignItems="center"
                w="50px"
                justifyContent="space-around"
              >
                {baths} <FaBath /> |
              </Text>
            </Box>
          </Box>
          <Box>
            <Box>
              <Text
                display="flex"
                alignItems="center"
                w="100px"
                justifyContent="space-around"
              >
                {millify(area)} sqft <BsGridFill />
              </Text>
            </Box>
          </Box>
        </Flex>
        <Box marginTop={'2'}>
          <Text fontSize="lg" marginBottom={'2'} fontWeight="bold">
            {title}
          </Text>
          <Text lineHeight={'1.5'} color="gray.600">
            {description.split('\n\n').map((paragraph, i) => (
              <p style={{ marginBottom: 10 }} key={i}>
                {paragraph
                  .split('\n')
                  .reduce((total, line) => [
                    total,
                    <br key="line" />,
                    line,
                  ])}
              </p>
            ))}
          </Text>
        </Box>
        <Flex
          flexWrap={'wrap'}
          textTransform="uppercase"
          justifyContent={'space-between'}
        >
          <Flex
            justifyContent={'space-between'}
            w="400px"
            borderBottom={'1px'}
            borderColor="gray.100"
            p="3"
          >
            <Text>Type</Text>
            <Text fontWeight={'bold'}>{type}</Text>
          </Flex>
          <Flex
            justifyContent={'space-between'}
            w="400px"
            borderBottom={'1px'}
            borderColor="gray.100"
            p="3"
          >
            <Text>Purpose</Text>
            <Text fontWeight={'bold'}>{purpose}</Text>
          </Flex>
          {furnishingStatus && (
            <Flex
              justifyContent={'space-between'}
              w="400px"
              borderBottom={'1px'}
              borderColor="gray.100"
              p="3"
            >
              <Text>Furnishing Status</Text>
              <Text fontWeight={'bold'}>{furnishingStatus}</Text>
            </Flex>
          )}
        </Flex>
        <Box>
          {amenities.length > 0 && amenities && (
            <Fragment>
              <Text fontSize={'2xl'} fontWeight="black" marginTop={5}>
                Amenities
              </Text>
              <Flex flexWrap={'wrap'}>
                {amenities.map((item) =>
                  item.amenities.map((amenity) => (
                    <MotionText
                      whileHover={{ scale: 1.1 }}
                      key={amenity.text}
                      fontWeight="bold"
                      color="gray.700"
                      fontSize={'l'}
                      p="2"
                      bg={'gray.200'}
                      m="2"
                      borderRadius={5}
                      cursor="pointer"
                    >
                      {amenity.text}
                    </MotionText>
                  )),
                )}
              </Flex>
            </Fragment>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export async function getServerSideProps({ params: { id } }) {
  const data = await fetchApi(
    `${baseUrl}/properties/detail?externalID=${id}`,
  );

  return {
    props: {
      propertyDetails: data,
    },
  };
}

export default PropertyDetails;
