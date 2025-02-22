'use client';

import Image from 'next/image';

export function Header() {
	return (
		<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
			<div className='flex items-center justify-center space-x-4'>
				<Image
					src='/wt-icon.svg'
					alt='Will Tendy'
					width={94}
					height={94}
					className='w-24 h-24'
					priority
				/>
				<div>
					<h1 className='text-2xl md:text-3xl font-semibold'>Will Tendy</h1>
					<div className='text-gray-600'>Guitar | Bass | Keys - LA/NYC</div>
				</div>
			</div>
		</div>
	);
}
