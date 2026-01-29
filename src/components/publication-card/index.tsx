import { Fragment } from 'react';
import { AiOutlineBook } from 'react-icons/ai';
import { FaQuoteLeft } from 'react-icons/fa';
import { HiOutlineTrophy } from 'react-icons/hi2';
import { GoFileDirectory } from 'react-icons/go';
import { IoDocumentTextOutline } from 'react-icons/io5';
import { SanitizedPublication } from '../../interfaces/sanitized-config';
import { skeleton } from '../../utils';

const PublicationCard = ({
  publications,
  loading,
}: {
  publications: SanitizedPublication[];
  loading: boolean;
}) => {
  // Group publications by section
  const groupedPublications = publications.reduce(
    (acc, pub) => {
      const section = pub.section || 'Publications';
      if (!acc[section]) {
        acc[section] = [];
      }
      acc[section].push(pub);
      return acc;
    },
    {} as Record<string, SanitizedPublication[]>,
  );

  // Define section order and icons
  const sectionConfig: Record<
    string,
    { icon: JSX.Element; subtitle: string }
  > = {
    'Blogs & Publications': {
      icon: <AiOutlineBook className="text-2xl" />,
      subtitle: 'articles',
    },
    Recommendations: {
      icon: <FaQuoteLeft className="text-xl" />,
      subtitle: 'testimonials',
    },
    Achievements: {
      icon: <HiOutlineTrophy className="text-2xl" />,
      subtitle: 'awards',
    },
    'Case Studies (Coming Soon)': {
      icon: <GoFileDirectory className="text-2xl" />,
      subtitle: 'case studies',
    },
    'Short Notes (Coming Soon)': {
      icon: <IoDocumentTextOutline className="text-2xl" />,
      subtitle: 'notes',
    },
  };

  const sectionOrder = [
    'Blogs & Publications',
    'Recommendations',
    'Achievements',
    'Case Studies (Coming Soon)',
    'Short Notes (Coming Soon)',
  ];

  const renderSkeleton = () => {
    const array = [];
    for (let index = 0; index < 4; index++) {
      array.push(
        <div className="card shadow-md card-sm bg-base-100" key={index}>
          <div className="p-6 h-full w-full">
            <div className="flex items-center flex-col">
              <div className="w-full">
                <div className="text-center w-full">
                  <h2 className="mb-2">
                    {skeleton({
                      widthCls: 'w-32',
                      heightCls: 'h-6',
                      className: 'mb-2 mx-auto',
                    })}
                  </h2>
                  <div>
                    {skeleton({
                      widthCls: 'w-full',
                      heightCls: 'h-4',
                      className: 'mb-2 mx-auto',
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>,
      );
    }
    return array;
  };

  const renderPublicationItem = (
    item: SanitizedPublication,
    index: number,
  ) => {
    const CardWrapper = item.link ? 'a' : 'div';
    const cardProps = item.link
      ? {
          href: item.link,
          target: '_blank',
          rel: 'noreferrer',
        }
      : {};

    return (
      <CardWrapper
        className={`card shadow-md card-sm bg-base-100 ${item.link ? 'cursor-pointer hover:shadow-lg transition-shadow' : ''}`}
        key={index}
        {...cardProps}
      >
        <div className="p-6 h-full w-full">
          <div className="flex items-center flex-col">
            <div className="w-full">
              <div className="text-center w-full">
                <h2 className="font-medium opacity-80 mb-2 text-sm">
                  {item.title}
                </h2>
                {item.description && (
                  <p className="text-base-content opacity-60 text-xs leading-relaxed">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardWrapper>
    );
  };

  const renderSection = (sectionName: string, items: SanitizedPublication[]) => {
    const config = sectionConfig[sectionName] || {
      icon: <AiOutlineBook className="text-2xl" />,
      subtitle: 'items',
    };

    return (
      <div
        className="col-span-1 lg:col-span-2"
        key={sectionName}
      >
        <div className="card bg-base-200 shadow-xl border border-base-300">
          <div className="card-body p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
              <div className="flex items-center space-x-3">
                {loading ? (
                  skeleton({
                    widthCls: 'w-10',
                    heightCls: 'h-10',
                    className: 'rounded-xl',
                  })
                ) : (
                  <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-xl">
                    {config.icon}
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <h3 className="text-base font-bold text-base-content truncate">
                    {loading
                      ? skeleton({ widthCls: 'w-32', heightCls: 'h-6' })
                      : sectionName}
                  </h3>
                  <div className="text-base-content/60 text-xs mt-0.5 truncate">
                    {loading
                      ? skeleton({ widthCls: 'w-24', heightCls: 'h-3' })
                      : `${items.length} ${config.subtitle}`}
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {loading
                ? renderSkeleton()
                : items.map((item, index) =>
                    renderPublicationItem(item, index),
                  )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Fragment>
      {sectionOrder.map((sectionName) => {
        const items = groupedPublications[sectionName];
        if (!items || items.length === 0) return null;
        return renderSection(sectionName, items);
      })}
    </Fragment>
  );
};

export default PublicationCard;
