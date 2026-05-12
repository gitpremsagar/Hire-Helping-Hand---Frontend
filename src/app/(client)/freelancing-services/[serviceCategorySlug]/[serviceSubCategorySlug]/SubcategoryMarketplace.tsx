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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  const location = [service.freelancer.city, service.freelancer.country]
    .filter(Boolean)
    .join(", ");

  return (
    <Card className="flex flex-col overflow-hidden border-border/80 shadow-sm transition-shadow hover:shadow-md">
      <div className="relative aspect-[16/10] w-full bg-muted">
        {cover ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={cover}
            alt=""
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
            No preview
          </div>
        )}
        <div className="absolute left-2 top-2 flex flex-wrap gap-1">
          {service.isProSeller ? (
            <Badge className="text-[10px]">Pro</Badge>
          ) : null}
          {service.isTopRated ? (
            <Badge variant="secondary" className="text-[10px]">
              Top rated
            </Badge>
          ) : null}
          {service.isFeatured ? (
            <Badge variant="outline" className="border-amber-500/60 text-[10px] text-amber-700 dark:text-amber-400">
              Featured
            </Badge>
          ) : null}
        </div>
      </div>
      <CardHeader className="space-y-1 pb-2">
        <CardTitle className="line-clamp-2 text-base leading-snug">
          {service.title}
        </CardTitle>
        <CardDescription className="line-clamp-2 text-xs">
          {service.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-3 pb-3">
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={service.freelancer.avatar ?? undefined} alt="" />
            <AvatarFallback className="text-xs">
              {service.freelancer.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">{service.freelancer.name}</p>
            {location ? (
              <p className="flex items-center gap-1 truncate text-xs text-muted-foreground">
                <MapPin className="h-3 w-3 shrink-0" aria-hidden />
                <span className="truncate">{location}</span>
              </p>
            ) : null}
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" aria-hidden />
            <span className="font-medium text-foreground">
              {service.rating != null ? service.rating.toFixed(1) : "—"}
            </span>
            <span>({service.ratingCount})</span>
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" aria-hidden />
            {service.deliveryTime} day{service.deliveryTime === 1 ? "" : "s"}
          </span>
        </div>
      </CardContent>
      <CardFooter className="mt-auto flex items-center justify-between border-t bg-muted/30 px-6 py-3">
        <div className="text-sm font-semibold">
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
        <Button size="sm" variant="default" onClick={() => onViewDetails(service.id)}>
          View details
        </Button>
      </CardFooter>
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
          "grid gap-4 sm:grid-cols-2 xl:grid-cols-3",
          isLoading || isFetching ? "opacity-70" : ""
        )}
      >
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} className="overflow-hidden">
                <div className="aspect-[16/10] animate-pulse bg-muted" />
                <CardHeader>
                  <div className="h-4 w-[70%] animate-pulse rounded bg-muted" />
                  <div className="mt-2 h-3 w-full animate-pulse rounded bg-muted" />
                </CardHeader>
                <CardContent>
                  <div className="h-8 w-full animate-pulse rounded bg-muted" />
                </CardContent>
              </Card>
            ))
          : services.length === 0
            ? (
                <div className="col-span-full flex flex-col items-center justify-center rounded-xl border border-dashed py-16 text-center">
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
