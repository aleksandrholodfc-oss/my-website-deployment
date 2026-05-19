import os

BASE = '/home/aleks/projects/my-website/app/services'
PAGES = [
    ('industrial',   'IndustrialPage'),
    ('refrigerator', 'RefrigeratorPage'),
    ('auto',         'AutoPage'),
    ('climate',      'ClimatePage'),
]

TMPL = "import ServicePageWrapper from '@/components/services/ServicePageWrapper';\n\nexport default function {fn}() {{\n  return <ServicePageWrapper slug=\"{slug}\" />;\n}}\n"

for slug, fn in PAGES:
    path = os.path.join(BASE, slug, 'page.tsx')
    with open(path, 'w', encoding='utf-8') as f:
        f.write(TMPL.format(fn=fn, slug=slug))
    print(f'Written: {path}')
