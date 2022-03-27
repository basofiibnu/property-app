import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Flex, Box, Text, Icon } from '@chakra-ui/react';
import { BsFilter } from 'react-icons/bs';
import {
  motion,
  AnimatePresence,
  AnimateSharedLayout,
} from 'framer-motion';
import SearchFilters from '../components/SearchFilters';
import Property from '../components/Property';

import noResult from '../assets/images/noresult.svg';
import { fetchApi, baseUrl } from '../utils/fetchApi';

const Search = ({ properties }) => {
  const [searchFilters, setSearchFilters] = useState(false);
  const router = useRouter();

  return (
    <Box>
      <Flex
        cursor={'pointer'}
        bg="gray.100"
        borderBottom={'1px'}
        borderColor="gray.200"
        p="2"
        fontWeight={'black'}
        fontSize="large"
        justifyContent={'center'}
        alignItems="center"
        onClick={() =>
          setSearchFilters((prevFilters) => !prevFilters)
        }
      >
        <Text>Search Property by Filter</Text>
        <Icon paddingLeft={'2'} w="7" as={BsFilter} />
      </Flex>
      <AnimateSharedLayout>
        <motion.div layout>
          {searchFilters && (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, top: 0 }}
                animate={{ opacity: 1, delay: 1 }}
                exit={{ opacity: 0, top: -100 }}
              >
                <SearchFilters isOpen={searchFilters} />
              </motion.div>
            </AnimatePresence>
          )}
        </motion.div>
      </AnimateSharedLayout>
      <Text fontSize={'2xl'} p="4" fontWeight={'bold'}>
        Properties{' '}
        {router.query.purpose === 'for-sale'
          ? 'For Sale'
          : 'For Rent'}
      </Text>
      <Flex flexWrap={'wrap'}>
        {properties.map((property, i) => (
          <Property property={property} key={i} />
        ))}
      </Flex>
      {properties.length === 0 && (
        <Flex
          justifyContent={'center'}
          alignItems="center"
          flexDirection={'column'}
          marginTop="5"
          marginBottom="5"
          height={'100vh'}
        >
          <Image alt="no-result" src={noResult} />
          <Text fontSize={'2xl'} marginTop="3">
            No Results Found
          </Text>
        </Flex>
      )}
    </Box>
  );
};

export async function getServerSideProps({ query }) {
  const purpose = query.purpose || 'for-rent';
  const rentFrequency = query.rentFrequency || 'yearly';
  const minPrice = query.minPrice || '0';
  const maxPrice = query.maxPrice || '1000000';
  const roomsMin = query.roomsMin || '0';
  const bathsMin = query.bathsMin || '0';
  const sort = query.sort || 'price-desc';
  const areaMax = query.areaMax || '35000';
  const locationExternalIDs = query.locationExternalIDs || '5002';
  const categoryExternalID = query.categoryExternalID || '4';

  const data = await fetchApi(
    `${baseUrl}/properties/list?hitsPerPage=50&locationExternalIDs=${locationExternalIDs}&purpose=${purpose}&categoryExternalID=${categoryExternalID}&bathsMin=${bathsMin}&rentFrequency=${rentFrequency}&priceMin=${minPrice}&priceMax=${maxPrice}&roomsMin=${roomsMin}&sort=${sort}&areaMax=${areaMax}`,
  );

  return {
    props: {
      properties: data?.hits,
    },
  };
}

export default Search;
