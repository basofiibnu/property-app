import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Box, Flex, Text, Avatar } from '@chakra-ui/react';
import { FaBed, FaBath } from 'react-icons/fa';
import { BsGridFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';
import { motion } from 'framer-motion';
import millify from 'millify';

import defaultImg from '../assets/images/house.jpeg';

const Property = ({
  property: {
    coverPhoto,
    price,
    rentFrequency,
    rooms,
    title,
    baths,
    area,
    agency,
    isVerified,
    externalID,
  },
}) => {
  const MotionFlex = motion(Flex);
  return (
    <Link href={`/property/${externalID}`} passHref>
      <MotionFlex
        flexWrap="wrap"
        w="420px"
        p="5"
        paddingTop="0"
        justifyContent="flex-start"
        cursor="pointer"
        whileHover={{
          scale: 1.05,
        }}
        whileTap={{
          scale: 0.9,
        }}
      >
        <Box>
          <Image
            src={coverPhoto ? coverPhoto.url : defaultImg}
            alt="house"
            width={400}
            height={260}
            placeholder="blur"
            blurDataURL="../assets/images/placeholder.png"
          />
        </Box>
        <Box w="full">
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
          <Text
            fontSize="md"
            color="gray.500"
            textTransform="lowercase"
          >
            {title.length > 30
              ? `${title.substring(0, 40)}...`
              : title}
          </Text>
        </Box>
      </MotionFlex>
    </Link>
  );
};

export default Property;
