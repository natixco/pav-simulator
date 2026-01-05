<script lang="ts">
  type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';

  let { variant, label, onClick, size, disabled } = $props<{
    label: string;
    onClick?: () => void;
    size: 'sm' | 'base';
    variant: ButtonVariant;
    disabled?: boolean;
  }>();

  const variantClassNames: Record<any, string> = {
    'primary': 'border-transparent bg-yellow-400 text-stone-900 enabled:hover:bg-stone-900 enabled:hover:text-yellow-400',
    'secondary': 'border-transparent bg-stone-900 text-stone-50 enabled:hover:bg-stone-700',
    'outline': 'border-transparent text-stone-900 enabled:hover:border-stone-900',
    'ghost': 'border-transparent text-stone-900 enabled:hover:bg-stone-200',
  };

  const fontVariantClassNames: Record<any, string> = {
    'base': 'font-bold',
    'sm': 'font-medium',
  };
</script>

<button onclick={() => onClick()}
        type="button"
        disabled={disabled}
        class={[
            variantClassNames[variant],
            fontVariantClassNames[size],
            'text-sm cursor-pointer tracking-wider border-2',
            {
                'h-10 px-10 ': size === 'base',
                'py-1 px-4': size === 'sm',
            }
        ]}>
    {label}
</button>