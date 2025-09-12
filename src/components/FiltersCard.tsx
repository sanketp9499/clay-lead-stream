import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { MapPin, Play } from 'lucide-react';
import { TagInput } from './TagInput';
import { FiltersSchema, type FiltersInput } from '@/lib/validation';
import type { Filters } from '@/lib/types';

interface FiltersCardProps {
  onRun: (filters: Filters) => void;
  isRunning: boolean;
}

export const FiltersCard: React.FC<FiltersCardProps> = ({ onRun, isRunning }) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm<FiltersInput>({
    resolver: zodResolver(FiltersSchema),
    defaultValues: {
      keywords: [],
      limit: 1000,
      hasInstagram: false,
      hasLinkedIn: false,
      hasPhone: false
    }
  });

  const keywords = watch('keywords') || [];
  const limit = watch('limit');

  const onSubmit = (data: FiltersInput) => {
    onRun(data as Filters);
  };

  return (
    <Card className="clay-card h-fit">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-900">Lead Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Location - Fixed to Ottawa */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Location</Label>
            <div className="location-badge">
              <MapPin size={16} />
              <span>Ottawa, ON</span>
              <span className="text-xs opacity-75">(fixed)</span>
            </div>
          </div>

          {/* Industry Keywords */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Industry Keywords</Label>
            <TagInput
              value={keywords}
              onChange={(tags) => setValue('keywords', tags)}
              placeholder="e.g., technology, healthcare, finance..."
            />
            <p className="text-xs text-gray-500">Separate with commas or Enter</p>
          </div>

          {/* Company Size */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Company Size</Label>
            <Select onValueChange={(value) => setValue('size', value as any)}>
              <SelectTrigger>
                <SelectValue placeholder="Select company size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-10">1-10 employees</SelectItem>
                <SelectItem value="11-50">11-50 employees</SelectItem>
                <SelectItem value="51-200">51-200 employees</SelectItem>
                <SelectItem value="201-500">201-500 employees</SelectItem>
                <SelectItem value="500+">500+ employees</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Social Media Filters */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-gray-700">Social Media Presence</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="instagram"
                  {...register('hasInstagram')}
                />
                <Label htmlFor="instagram" className="text-sm text-gray-600">Has Instagram</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="linkedin"
                  {...register('hasLinkedIn')}
                />
                <Label htmlFor="linkedin" className="text-sm text-gray-600">Has LinkedIn</Label>
              </div>
            </div>
          </div>

          {/* Phone Number */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="phone"
              {...register('hasPhone')}
            />
            <Label htmlFor="phone" className="text-sm text-gray-600">Has Phone Number</Label>
          </div>

          {/* Result Limit */}
          <div className="space-y-2">
            <Label htmlFor="limit" className="text-sm font-medium text-gray-700">Result Limit</Label>
            <Input
              id="limit"
              type="number"
              min={1}
              max={5000}
              {...register('limit', { valueAsNumber: true })}
              className="w-full"
            />
            {errors.limit && (
              <p className="text-xs text-red-600">{errors.limit.message}</p>
            )}
            <p className="text-xs text-gray-500">Maximum 5,000 results</p>
          </div>

          {/* Run Button */}
          <Button
            type="submit"
            disabled={isRunning}
            className="w-full bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary-hover))] text-white"
          >
            <Play size={16} className="mr-2" />
            {isRunning ? 'Running...' : 'Start Lead Generation'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};