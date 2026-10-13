# Установка LocalDevBadges (Vencord userplugin)

Плагин **не** ставится через обычный инсталлер Vencord. Нужна сборка из исходников.

Официальный гайд: [Installing custom plugins](https://docs.vencord.dev/installing/custom-plugins/)

## 1. Собрать Vencord из исходников

Если ещё не собирали — следуйте: [Installing from Source](https://docs.vencord.dev/installing/).

Кратко (Windows, PowerShell):

```powershell
git clone https://github.com/Vendicated/Vencord
cd Vencord
pnpm install
pnpm build
```

Нужны: [Git](https://git-scm.com/), [Node.js LTS](https://nodejs.org/), [pnpm](https://pnpm.io/).

## 2. Добавить плагин в `userplugins`

В папке исходников Vencord создайте (если нет) каталог:

```text
Vencord/src/userplugins/
```

Скопируйте туда папку `localDevBadges` из этого репозитория:

```text
Vencord/src/userplugins/localDevBadges/index.tsx
```

Пример (из корня этого репо, после `git clone`):

```powershell
# путь к вашему клону Vencord
$Vencord = "C:\path\to\Vencord"
New-Item -ItemType Directory -Force -Path "$Vencord\src\userplugins" | Out-Null
Copy-Item -Recurse -Force .\localDevBadges "$Vencord\src\userplugins\localDevBadges"
```

Или клонируйте этот репозиторий прямо в `userplugins` (если репо содержит только плагин на верхнем уровне — используйте копирование папки, как выше).

## 3. Пересобрать и внедрить

```powershell
cd C:\path\to\Vencord
pnpm build
pnpm inject
```

Для Discord PTB / Canary см. флаги в документации Vencord (`pnpm inject` с нужной целью).

## 4. Включить плагин

1. Полностью перезапустите Discord  
2. **User Settings → Vencord → Plugins**  
3. Найдите **LocalDevBadges** и включите  
4. В настройках плагина включите нужные бейджи  

## 5. Обновление плагина

Скопируйте новую версию `localDevBadges` поверх старой и снова:

```powershell
pnpm build
pnpm inject
```

Затем перезапустите Discord.

## Troubleshooting

| Проблема | Что проверить |
|----------|----------------|
| Плагина нет в списке | Путь `src/userplugins/localDevBadges/index.tsx`, пустых папок в `userplugins` нет, `pnpm build` без ошибок |
| Бейджей не видно | Плагин включён, тумблеры в настройках ON, смотрите **свой** профиль |
| Ошибка `localeCompare` | Пустая папка/файл в `userplugins` — удалите мусор |

## English summary

1. Build Vencord from source  
2. Copy `localDevBadges/` into `Vencord/src/userplugins/`  
3. `pnpm build` → `pnpm inject` → restart Discord  
4. Enable **LocalDevBadges** and toggle badges in plugin settings  
