import { useEffect, useState } from 'react';
import { Link, VStack, Icon, Button } from '@chakra-ui/react';
import { BsTwitter } from 'react-icons/bs';
import { BiCopy } from 'react-icons/bi';

export const SIdeShareBtn: React.FC = ({}) => {
  const [twitterLink, setTwitterLink] = useState('');

  useEffect(() => {
    setTwitterLink(`https://twitter.com/share?${location.href}`);
  }, []);

  const copyLink = () => {
    navigator.clipboard.writeText(location.href);
  };

  return (
    <VStack pos="fixed" bottom="50%" left="0" color="white" zIndex={8}>
      <Link
        p="2"
        bg="twitter.400"
        roundedRight="lg"
        shadow="xl"
        _hover={{ bg: 'twitter.600' }}
        href={twitterLink}
        alt="twitter link"
      >
        <Icon as={BsTwitter} w="6" h="6" />
      </Link>
      <Button
        p="2"
        bg="teal.400"
        roundedLeft="none"
        shadow="xl"
        _hover={{ bg: 'teal.600' }}
        onClick={copyLink}
        aria-label="URLのコピーボタン"
      >
        <Icon as={BiCopy} w="6" h="6" />
      </Button>
    </VStack>
  );
};
