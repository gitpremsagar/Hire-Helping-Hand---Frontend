"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Clock,
  Loader2,
  MapPin,
  Search,
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useGetFreelancingServiceById, useGetFreelancingServices } from "@/lib/modules/freelancingService/useGetFreelancingServices.hook";
import type { FreelancingServiceQueryInput } from "@/lib/modules/freelancingService/freelancingService.schemas";
import {
  MarketplaceFreelancingServiceDetail,
  MarketplaceFreelancingServiceListItem,
  ServiceStatus,
} from "@/lib/modules/freelancingService/freelancingService.types";
import { cn } from "@/lib/utils";
import { getYoutubeEmbedSrc, YOUTUBE_EMBED_ALLOW } from "@/lib/youtubeVideoIntroduction";

export type SubcategoryMarketplaceProps = {
  categoryId: string;
  subCategoryId: string;
  categoryName: string;
  subCategoryName: string;
  subCategoryDescription: string;
};

function ServiceCard({
  service,
  onViewDetails,
}: {
  service: MarketplaceFreelancingServiceListItem;
  onViewDetails: (id: string) => void;
}) {
  const cover = service.gallery?.[0];
  const embedSrc = getYoutubeEmbedSrc(service.videoIntroduction);
  const location = [service.freelancer.city, service.freelancer.country]
    .filter(Boolean)
    .join(", ");

  return (
    <Card className="gap-0 overflow-hidden border-border/80 py-0 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex w-full flex-col">
        {/* Media on top, full card width, 16:9 */}
        <div className="relative w-full shrink-0">
          <div className="relative aspect-video w-full overflow-hidden bg-black">
            {embedSrc ? (
              <iframe
                title={`${service.title} — introduction video`}
                src={embedSrc}
                className="absolute inset-0 block h-full w-full border-0"
                allow={YOUTUBE_EMBED_ALLOW}
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            ) : cover ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={cover}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-muted px-2 text-center text-[10px] text-muted-foreground sm:text-xs">
                No preview
              </div>
            )}
            <div className="pointer-events-none absolute left-2 top-2 z-10 flex max-w-[calc(100%-3rem)] flex-wrap gap-1 sm:left-3 sm:top-3">
              {service.isProSeller ? (
                <Badge className="pointer-events-auto px-1 py-0 text-[9px] sm:text-[10px]">Pro</Badge>
              ) : null}
              {service.isTopRated ? (
                <Badge variant="secondary" className="pointer-events-auto px-1 py-0 text-[9px] sm:text-[10px]">
                  Top rated
                </Badge>
              ) : null}
              {service.isFeatured ? (
                <Badge
                  variant="outline"
                  className="pointer-events-auto border-amber-500/60 px-1 py-0 text-[9px] text-amber-700 dark:text-amber-400 sm:text-[10px]"
                >
                  Featured
                </Badge>
              ) : null}
            </div>
            <div className="pointer-events-none absolute bottom-2 right-2 z-10 rounded bg-black/80 px-1.5 py-0.5 text-[10px] font-medium tabular-nums text-white sm:text-[11px]">
              {service.deliveryTime}d
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1.5 p-3 sm:gap-2 sm:p-4">
          <CardTitle className="line-clamp-2 text-sm font-semibold leading-snug sm:text-base">
            {service.title}
          </CardTitle>

          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-muted-foreground sm:gap-x-3">
            <span className="inline-flex items-center gap-1">
              <Star className="h-3 w-3 shrink-0 fill-amber-400 text-amber-400 sm:h-3.5 sm:w-3.5" aria-hidden />
              <span className="font-medium text-foreground">
                {service.rating != null ? service.rating.toFixed(1) : "—"}
              </span>
              <span>({service.ratingCount} reviews)</span>
            </span>
            <span className="hidden text-muted-foreground/70 sm:inline" aria-hidden>
              •
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3 w-3 shrink-0 sm:h-3.5 sm:w-3.5" aria-hidden />
              {service.deliveryTime} day{service.deliveryTime === 1 ? "" : "s"} delivery
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Avatar className="h-7 w-7 shrink-0 sm:h-8 sm:w-8">
              <AvatarImage src={service.freelancer.avatar ?? undefined} alt="" />
              <AvatarFallback className="text-[10px] sm:text-xs">
                {service.freelancer.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-medium sm:text-sm">{service.freelancer.name}</p>
              {location ? (
                <p className="flex items-center gap-1 truncate text-[11px] text-muted-foreground/90 sm:text-xs">
                  <MapPin className="h-3 w-3 shrink-0" aria-hidden />
                  <span className="truncate">{location}</span>
                </p>
              ) : null}
            </div>
          </div>

          <CardDescription className="line-clamp-2 text-xs leading-relaxed text-muted-foreground sm:text-[13px]">
            {service.description}
          </CardDescription>

          <div className="mt-auto flex flex-wrap items-center justify-between gap-2 border-t border-border/60 pt-2 sm:pt-2.5">
            <div className="text-sm font-semibold tabular-nums">
              {service.isCustomPricing ? (
                <span className="text-muted-foreground">Custom quote</span>
              ) : service.basePrice != null ? (
                <span>
                  {service.currency} {service.basePrice.toFixed(0)}
                </span>
              ) : (
                <span className="text-muted-foreground">Contact for price</span>
              )}
            </div>
            <Button size="sm" variant="default" className="shrink-0" onClick={() => onViewDetails(service.id)}>
              View details
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

function ServiceDetailDialog({
  serviceId,
  open,
  onOpenChange,
}: {
  serviceId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { data, isLoading, isError, error } = useGetFreelancingServiceById(serviceId ?? "");
  const service = data?.data as MarketplaceFreelancingServiceDetail | undefined;
  const detailIntroSrc = service ? getYoutubeEmbedSrc(service.videoIntroduction) : null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-lg overflow-y-auto sm:max-w-xl">
        {!serviceId ? null : isLoading ? (
          <div className="flex items-center justify-center gap-2 py-12 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" />
            Loading…
          </div>
        ) : isError ? (
          <p className="py-8 text-center text-sm text-destructive">
            {error instanceof Error ? error.message : "Could not load this service."}
          </p>
        ) : service ? (
          <>
            <DialogHeader>
              <DialogTitle className="pr-8 text-left leading-snug">{service.title}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={service.freelancer.avatar ?? undefined} alt="" />
                  <AvatarFallback>
                    {service.freelancer.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{service.freelancer.name}</p>
                  <p className="text-muted-foreground text-xs">
                    {[service.freelancer.city, service.freelancer.country].filter(Boolean).join(", ") ||
                      "Freelancer"}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 text-xs">
                <Badge variant="outline">{service.ServiceSubCategory.name}</Badge>
                {service.isProSeller ? <Badge>Pro</Badge> : null}
                {service.isTopRated ? <Badge variant="secondary">Top rated</Badge> : null}
              </div>
              <Separator />
              <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm">
                <div>
                  <p className="text-muted-foreground">Starting at</p>
                  <p className="font-medium">
                    {service.isCustomPricing
                      ? "Custom quote"
                      : service.basePrice != null
                        ? `${service.currency} ${service.basePrice.toFixed(0)}`
                        : "—"}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Delivery</p>
                  <p className="font-medium">{service.deliveryTime} days</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Revisions</p>
                  <p className="font-medium">{service.revisionPolicy}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Rating</p>
                  <p className="font-medium">
                    {service.rating != null ? `${service.rating.toFixed(1)} (${service.ratingCount})` : "—"}
                  </p>
                </div>
              </div>
              <Separator />
              {detailIntroSrc ? (
                <div>
                  <h4 className="mb-2 font-medium">Introduction video</h4>
                  <div className="relative aspect-video w-full overflow-hidden rounded-md bg-muted">
                    <iframe
                      title="Service introduction video"
                      src={detailIntroSrc}
                      className="absolute inset-0 h-full w-full border-0"
                      allow={YOUTUBE_EMBED_ALLOW}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="strict-origin-when-cross-origin"
                    />
                  </div>
                </div>
              ) : null}
              <div>
                <h4 className="mb-1 font-medium">About this service</h4>
                <p className="text-muted-foreground whitespace-pre-wrap text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
              {service.requirements ? (
                <div>
                  <h4 className="mb-1 font-medium">What I need from you</h4>
                  <p className="text-muted-foreground whitespace-pre-wrap text-sm leading-relaxed">
                    {service.requirements}
                  </p>
                </div>
              ) : null}
              {service.packages && service.packages.length > 0 ? (
                <div>
                  <h4 className="mb-2 font-medium">Packages</h4>
                  <ul className="space-y-2">
                    {service.packages.map((pkg) => (
                      <li
                        key={pkg.id}
                        className="rounded-md border bg-muted/40 px-3 py-2 text-xs sm:text-sm"
                      >
                        <p className="font-medium">
                          {pkg.name}{" "}
                          <span className="text-muted-foreground font-normal">({pkg.tier})</span>
                        </p>
                        <p className="text-muted-foreground">
                          {service.currency} {pkg.price} · {pkg.deliveryDays} days · {pkg.revisions}{" "}
                          revisions
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {service.gallery && service.gallery.length > 0 ? (
                <div>
                  <h4 className="mb-2 font-medium">Gallery</h4>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {service.gallery.slice(0, 6).map((url) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        key={url}
                        src={url}
                        alt=""
                        className="aspect-video w-full rounded-md object-cover"
                      />
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </>
        ) : (
          <p className="py-8 text-center text-sm text-muted-foreground">No data.</p>
        )}
      </DialogContent>
    </Dialog>
  );
}

export function SubcategoryMarketplace({
  categoryId,
  subCategoryId,
  categoryName,
  subCategoryName,
  subCategoryDescription,
}: SubcategoryMarketplaceProps) {
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [sortBy, setSortBy] = useState<FreelancingServiceQueryInput["sortBy"]>("createdAt");
  const [sortOrder, setSortOrder] = useState<FreelancingServiceQueryInput["sortOrder"]>("desc");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [detailId, setDetailId] = useState<string | null>(null);

  useEffect(() => {
    const t = window.setTimeout(() => setDebouncedSearch(searchInput.trim()), 400);
    return () => window.clearTimeout(t);
  }, [searchInput]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, sortBy, sortOrder, minPrice, maxPrice, categoryId, subCategoryId]);

  const minPriceNum = minPrice === "" ? undefined : Number(minPrice);
  const maxPriceNum = maxPrice === "" ? undefined : Number(maxPrice);

  const queryParams = useMemo(
    () => ({
      categoryId: categoryId as FreelancingServiceQueryInput["categoryId"],
      subCategoryId: subCategoryId as FreelancingServiceQueryInput["subCategoryId"],
      status: ServiceStatus.APPROVED,
      page,
      limit: 12,
      search: debouncedSearch || undefined,
      sortBy,
      sortOrder,
      minPrice:
        minPriceNum !== undefined && !Number.isNaN(minPriceNum) ? minPriceNum : undefined,
      maxPrice:
        maxPriceNum !== undefined && !Number.isNaN(maxPriceNum) ? maxPriceNum : undefined,
    }),
    [
      categoryId,
      subCategoryId,
      page,
      debouncedSearch,
      sortBy,
      sortOrder,
      minPriceNum,
      maxPriceNum,
    ]
  );

  const { data, isLoading, isFetching, isError, error, refetch } = useGetFreelancingServices(queryParams);

  const services = data?.data ?? [];
  const pagination = data?.pagination;
  const totalPages = pagination?.totalPages ?? 1;

  const onViewDetails = useCallback((id: string) => {
    setDetailId(id);
  }, []);

  return (
    <div className="flex flex-col gap-6 px-4 py-6 md:px-6 lg:px-8">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <span className="text-muted-foreground">{categoryName}</span>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{subCategoryName}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <header className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">{subCategoryName}</h1>
        <p className="text-muted-foreground max-w-3xl text-sm leading-relaxed md:text-base">
          {subCategoryDescription ||
            `Compare vetted freelancers offering ${subCategoryName.toLowerCase()} services. Filter by price, delivery time, and ratings to find the right fit for your project.`}
        </p>
      </header>

      <div className="flex flex-col gap-4 rounded-xl border bg-card/50 p-4 shadow-sm">
        <div className="flex flex-col gap-3 lg:flex-row lg:flex-wrap lg:items-end">
          <div className="relative min-w-[200px] flex-1 lg:max-w-md">
            <Label htmlFor="svc-search" className="sr-only">
              Search in this category
            </Label>
            <Search className="text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
            <Input
              id="svc-search"
              placeholder="Search titles, descriptions, tags…"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label className="text-xs">Sort by</Label>
            <Select
              value={sortBy}
              onValueChange={(v) => setSortBy(v as FreelancingServiceQueryInput["sortBy"])}
            >
              <SelectTrigger className="w-full min-w-[160px] lg:w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="createdAt">Newest</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
                <SelectItem value="price">Price</SelectItem>
                <SelectItem value="deliveryTime">Delivery time</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-1">
            <Label className="text-xs">Order</Label>
            <Select
              value={sortOrder}
              onValueChange={(v) => setSortOrder(v as FreelancingServiceQueryInput["sortOrder"])}
            >
              <SelectTrigger className="w-full min-w-[120px] lg:w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="desc">High → low</SelectItem>
                <SelectItem value="asc">Low → high</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-wrap gap-2">
            <div className="flex flex-col gap-1">
              <Label htmlFor="min-p" className="text-xs">
                Min price
              </Label>
              <Input
                id="min-p"
                type="number"
                min={0}
                placeholder="0"
                className="w-[100px]"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="max-p" className="text-xs">
                Max price
              </Label>
              <Input
                id="max-p"
                type="number"
                min={0}
                placeholder="Any"
                className="w-[100px]"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {isError ? (
        <div className="rounded-lg border border-destructive/40 bg-destructive/5 p-6 text-center">
          <p className="text-destructive text-sm font-medium">
            {error instanceof Error ? error.message : "Something went wrong loading services."}
          </p>
          <Button variant="outline" className="mt-4" onClick={() => refetch()}>
            Try again
          </Button>
        </div>
      ) : null}

      <div
        className={cn(
          "mx-auto flex w-full max-w-4xl flex-col gap-3 sm:gap-4",
          isLoading || isFetching ? "opacity-70" : ""
        )}
      >
          {isLoading
          ? Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="gap-0 overflow-hidden py-0">
                <div className="flex flex-col">
                  <div className="aspect-video w-full animate-pulse bg-muted" />
                  <div className="flex flex-col gap-2 p-3 sm:p-4">
                    <div className="h-4 w-[72%] animate-pulse rounded bg-muted sm:h-5" />
                    <div className="h-3 w-40 animate-pulse rounded bg-muted" />
                    <div className="flex items-center gap-2 pt-1">
                      <div className="h-7 w-7 shrink-0 animate-pulse rounded-full bg-muted sm:h-8 sm:w-8" />
                      <div className="h-3 flex-1 animate-pulse rounded bg-muted" />
                    </div>
                    <div className="h-3 w-full animate-pulse rounded bg-muted" />
                    <div className="mt-1 h-3 w-[88%] animate-pulse rounded bg-muted" />
                    <div className="mt-auto flex justify-between gap-2 border-t border-border/60 pt-2">
                      <div className="h-4 w-16 animate-pulse rounded bg-muted" />
                      <div className="h-8 w-24 animate-pulse rounded-md bg-muted" />
                    </div>
                  </div>
                </div>
              </Card>
            ))
          : services.length === 0
            ? (
                <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-16 text-center">
                  <p className="text-muted-foreground max-w-md text-sm">
                    No published services in this subcategory yet. Try another subcategory from the
                    sidebar, or widen your search and price filters.
                  </p>
                </div>
              )
            : (
                services.map((svc) => (
                  <ServiceCard key={svc.id} service={svc} onViewDetails={onViewDetails} />
                ))
              )}
      </div>

      {pagination && totalPages > 1 ? (
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            disabled={!pagination.hasPrevPage}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          <span className="text-muted-foreground text-sm">
            Page {pagination.currentPage} of {pagination.totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={!pagination.hasNextPage}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      ) : null}

      <ServiceDetailDialog
        serviceId={detailId}
        open={!!detailId}
        onOpenChange={(open) => {
          if (!open) setDetailId(null);
        }}
      />
    </div>
  );
}
