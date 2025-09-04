// CreateButton.tsx
import React from 'react';
import { Button, Flex } from 'antd';
import { useRouter } from 'next/navigation';

interface CreateButtonProps {
  page: string;
}

const CreateButton: React.FC<CreateButtonProps> = ({ page }) => {
  const router = useRouter();
  
  // Debug logging to help identify the issue
  console.log('CreateButton rendered with page prop:', page);
  console.log('CreateButton component stack:', new Error().stack);

  const handleCreateClick = () => {
    console.log('Page prop received:', page); // Better debugging
    if (page && typeof page === 'string') {
      router.push(`/products/${page}/create`);
    } else {
      console.error('Page prop is missing or invalid:', page);
      // Fallback to a default page or show an error message
      alert('Error: Page configuration is missing. Please contact support.');
    }
  };

  return (
    <Flex gap="small" wrap>
      <Button type="primary" onClick={handleCreateClick}>
        Create +
      </Button>
    </Flex>
  );
};

export default CreateButton;
