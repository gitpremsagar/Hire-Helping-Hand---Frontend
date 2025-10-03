export default function JobsPage({ params }: { params: { serviceCategorySlug: string, serviceSubCategorySlug: string } }) {
  return <div>JobsPage {params.serviceCategorySlug} {params.serviceSubCategorySlug}</div>;
}