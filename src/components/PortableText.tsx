import { PortableText as BasePortableText } from '@portabletext/react';
import { urlFor } from '../lib/sanity';

const components = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <div className="my-8">
          <img
            src={urlFor(value).width(800).height(450).url()}
            alt={value.alt || ''}
            className="rounded-lg shadow-lg"
          />
          {value.caption && (
            <div className="mt-2 text-center text-sm text-gray-600">
              {value.caption}
            </div>
          )}
        </div>
      );
    },
  },
  marks: {
    link: ({ children, value }: any) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;
      return (
        <a
          href={value.href}
          rel={rel}
          className="text-blue-600 hover:text-blue-800 underline"
        >
          {children}
        </a>
      );
    },
  },
};

export default function PortableText({ value }: { value: any }) {
  return <BasePortableText value={value} components={components} />;
}