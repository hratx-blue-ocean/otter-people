import React, { useState, useEffect } from 'react';

import { Box } from "@chakra-ui/react"
import { Text } from "@chakra-ui/react"
import { Heading } from "@chakra-ui/react"
import { Image } from "@chakra-ui/react"
import { SimpleGrid } from "@chakra-ui/react"
import { Select } from "@chakra-ui/react"
import { Center } from "@chakra-ui/react"
import { TriangleUpIcon, TriangleDownIcon } from '@chakra-ui/icons'
import { IconButton } from "@chakra-ui/react"

//change this to props later
import { apiTransformed } from './sampleData.js'

export default function Recs(props) {

  //useState hooks
  const [category, setCategory] = useState("All");
  const [itemsShown, setItemsShown] = useState(4);
  const [isMore, setIsMore] = useState(true);
  // const [data, setData] = useState(apiTransformed.slice(0, itemsShown))

  //useEffect hooks
  // useEffect(() => {
  //   setData(apiTransformed.slice(0, itemsShown))
  // }, [itemsShown])

  const onChange = (e) => {
    setCategory(e.target.value || "All")
  };

  const onClick = () => {
    //open Create Event modal
    //autofill name and location (reverse geocode)
  };

  const onSeeMore = () => {
    setItemsShown(itemsShown + 4)

  };

  const onCollapse = () => {
    setItemsShown(4)
  };

  const eachRecommendation = (dataObj, index) => {
    return (
      < Box key={index} p="2" >
        {/*  */}
        {/* Need to hardcode height="" pixels based on final layout */}
        {/*  */}
        <Image objectFit="cover" maxWidth="100%" maxHeight="100%" src={dataObj.imageURL}
          alt={dataObj.name} />
        <Box
          mt="1"
          lineHeight="tight"
        >
          <Text isTruncated fontSize="xs">{dataObj.name}</Text>
        </Box>
      </Box>
    )
  }

  return (
    <Box maxW="100%" width="100%" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Heading p="1" size="lg">Around Town</Heading>
      <Text p="1" fontSize="sm" >Click to Add As Your Next Event!</Text>
      <Center>
        <Select p="1" onChange={onChange} placeholder="Category" size="sm" width="50%">
          <option value="SIGHTS">Sights</option>
          <option value="NIGHTLIFE">Nightlife</option>
          <option value="RESTAURANT">Restaurants</option>
          <option value="SHOPPING">Shopping</option>
        </Select>
      </Center>

      {category === "All" ?
        <SimpleGrid columns={2} >
          {apiTransformed.slice(0, itemsShown).map((each, i) =>
            eachRecommendation(each, i)
          )}
        </SimpleGrid>
        :
        <SimpleGrid columns={2} >
          {/*  */}
          {/* Consider making separate data arrays for each category? */}
          {/* Problem is that this is truncating results */}
          {/*  */}
          {apiTransformed.slice(0, itemsShown).map((each, i) => {
            if (category === each.category) {
              return (
                eachRecommendation(each, i)
              )
            }
          }
          )}
        </SimpleGrid>
      }
      <Center>

        {
          itemsShown < apiTransformed.length && apiTransformed.length > 4 ?
            <IconButton onClick={onSeeMore} aria-label="See More" icon={<TriangleDownIcon />} />
            :
            <IconButton onClick={onCollapse} aria-label="Collapse" icon={<TriangleUpIcon />} />
        }

        <br /><br />
      </Center>
    </Box >
  )
}