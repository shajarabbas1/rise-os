import FeedNewsCard from '@/components/shared/cards/FeedNews.card';
import Row from '@/components/shared/row';
import { CardDescription, CardHeading } from '@/components/shared/typography';

const Feed = () => {
  return (
    <Row className="w-full bg-white p-6 gap-4 flex-col rounded-2xl ">
      <Row className="flex-col gap-3">
        <CardHeading title="Information Hub" />
        <CardDescription title="Stay informed with the latest updates, articles, and news. Explore important insights, policy changes, and helpful resources to stay up to date." />
      </Row>

      {[
        {
          newsDate: 'March 14, 2025',
          newsDay: 'Friday',
          newsTime: '11:30 am',
          title: 'New NDIS Policy Changes Explained',
          headerImage:
            'https://images.unsplash.com/photo-1742974368982-54d87c84fe97?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyNXx8fGVufDB8fHx8fA%3D%3D',
          description:
            'The latest updates to NDIS policies aim to improve accessibility and streamline the application process. Read more to see these changes may affect you',
        },
        {
          newsDate: 'March 14, 2025',
          newsDay: 'Friday',
          newsTime: '11:30 am',
          title: 'New NDIS Policy Changes Explained',
          headerImage:
            'https://images.unsplash.com/photo-1742974368982-54d87c84fe97?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyNXx8fGVufDB8fHx8fA%3D%3D',
          description:
            'The latest updates to NDIS policies aim to improve accessibility and streamline the application process. Read more to see these changes may affect you',
        },
      ].map((item, index) => (
        <FeedNewsCard key={index} data={item} />
      ))}
    </Row>
  );
};

export default Feed;
