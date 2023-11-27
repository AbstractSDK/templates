import Head from 'next/head'
import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Grid,
  Heading,
  Icon,
  Link,
  Stack,
  Text,
  useColorMode,
} from '@chakra-ui/react'
import { BsFillMoonStarsFill, BsFillSunFill } from 'react-icons/bs'

import { useChain } from '@cosmos-kit/react'

import { chainName, dependencies, products } from '../config'
import { Dependency, handleChangeColorModeValue, Product, WalletSection } from '../components'
import React from 'react'

const library = {
  title: 'TS Codegen',
  text: 'The quickest and easiest way to convert CosmWasm Contracts into dev-friendly TypeScript classes.',
  href: 'https://github.com/CosmWasm/ts-codegen'
};

const Layout = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { status } = useChain(chainName);

  return (
    <Container maxW="5xl" py={10}>
      <Head>
        <title>Create Cosmos App</title>
        <meta name="description" content="Generated by create cosmos app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex justifyContent="end" mb={4}>
        <Button variant="outline" px={0} onClick={toggleColorMode}>
          <Icon
            as={colorMode === 'light' ? BsFillMoonStarsFill : BsFillSunFill}
          />
        </Button>
      </Flex>
      <Box textAlign="center">
        <Heading
          as="h1"
          fontSize={{ base: '3xl', sm: '4xl', md: '5xl' }}
          fontWeight="extrabold"
          mb={3}
        >
          Create Cosmos App
        </Heading>
        <Heading
          as="h1"
          fontWeight="bold"
          fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}
        >
          <Text as="span">Welcome to&nbsp;</Text>
          <Text
            as="span"
            color={handleChangeColorModeValue(
              colorMode,
              'primary.500',
              'primary.200'
            )}
          >
            CosmosKit + Next.js +{' '}
            <a href={library.href} target="_blank" rel="noreferrer">
              {library.title}
            </a>
          </Text>
        </Heading>
      </Box>

      <WalletSection />

      <Box my={20}>
        <Divider />
      </Box>
      <Grid
        templateColumns={{
          md: 'repeat(2, 1fr)',
          lg: 'repeat(3, 1fr)',
        }}
        gap={8}
        mb={14}
      >
        {products.map((product) => (
          <Product key={product.title} {...product}></Product>
        ))}
      </Grid>
      <Grid templateColumns={{ md: 'repeat(3, 1fr)' }} gap={8} mb={20}>
        <Dependency {...library} />
        {dependencies.map((dependency) => (
          <Dependency key={dependency.title} {...dependency}></Dependency>
        ))}
      </Grid>

      <Box mb={3}>
        <Divider />
      </Box>
      <Stack
        isInline={true}
        spacing={1}
        justifyContent="center"
        opacity={0.5}
        fontSize="sm"
      >
        <Text>Built with</Text>
        <Link
          href="https://cosmology.tech/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Cosmology
        </Link>
        <Text>and</Text>
        <Link
          href="https://abstract.money/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Abstract
        </Link>
      </Stack>
    </Container>
  );
}

export default function Home() {
  return (
      <Layout />
  );
}