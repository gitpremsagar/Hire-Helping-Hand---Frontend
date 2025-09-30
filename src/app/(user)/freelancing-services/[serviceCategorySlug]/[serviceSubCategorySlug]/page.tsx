export default function ServicesPage({ params }: { params: { serviceCategorySlug: string, serviceSubCategorySlug: string } }) {
  return <div>Services Page {params.serviceCategorySlug} {params.serviceSubCategorySlug}</div>;
}