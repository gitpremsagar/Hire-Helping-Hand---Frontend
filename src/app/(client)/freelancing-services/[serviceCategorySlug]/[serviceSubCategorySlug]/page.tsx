type ServicesPageProps = {
  params: Promise<{
    serviceCategorySlug: string;
    serviceSubCategorySlug: string;
  }>;
};

export default async function ServicesPage({ params }: ServicesPageProps) {
  const { serviceCategorySlug, serviceSubCategorySlug } = await params;
  return (
    <div>
      Services Page {serviceCategorySlug} {serviceSubCategorySlug}
    </div>
  );
}
