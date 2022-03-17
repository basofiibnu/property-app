import React, { useContext } from 'react';
import Image from 'next/image';
import { Box, Icon, Flex } from '@chakra-ui/react';
import {
  ScrollMenu,
  VisibilityContext,
} from 'react-horizontal-scrolling-menu';
import {
  FaArrowAltCircleLeft,
  FaArrowAltCircleRight,
} from 'react-icons/fa';

const LeftArrow = () => {
  const { scrollPrev } = useContext(VisibilityContext);

  return (
    <Flex
      justifyContent={'center'}
      alignItems="center"
      marginRight={'1'}
    >
      <Icon
        as={FaArrowAltCircleLeft}
        onClick={() => scrollPrev()}
        fontSize="2xl"
        cursor={'pointer'}
      />
    </Flex>
  );
};

const RightArrow = () => {
  const { scrollNext } = useContext(VisibilityContext);

  return (
    <Flex
      justifyContent={'center'}
      alignItems="center"
      marginRight={'1'}
    >
      <Icon
        as={FaArrowAltCircleRight}
        onClick={() => scrollNext()}
        fontSize="2xl"
        cursor={'pointer'}
      />
    </Flex>
  );
};

const ImageScrollbar = ({ data }) => {
  return (
    <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
      {data.map(({ id, url }, i) => (
        <Box
          width={'910px'}
          itemId={id}
          overflow="hidden"
          p="1"
          key={i}
        >
          <Image
            placeholder="blur"
            blurDataURL={url}
            src={url}
            width="1000px"
            height={'500px'}
            alt="Property Image"
            sizes="{max-width: 500px} 100px, (max-width:1023px) 400px, 1000px"
          />
        </Box>
      ))}
    </ScrollMenu>
  );
};

export default ImageScrollbar;
