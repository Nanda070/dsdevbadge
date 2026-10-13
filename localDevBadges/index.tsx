/*
 * LocalDevBadges — client-side only profile badges for the current user.
 * Visible only in your own Discord client; does not grant real badges.
 */

import { addProfileBadge, BadgePosition, removeProfileBadge, type ProfileBadge } from "@api/Badges";
import { definePluginSettings } from "@api/Settings";
import definePlugin, { OptionType } from "@utils/types";
import { UserStore } from "@webpack/common";

const CDN = "https://cdn.discordapp.com/badge-icons";

const settings = definePluginSettings({
    discordStaff: {
        type: OptionType.BOOLEAN,
        description: "Show Discord Staff badge on your profile (local only)",
        default: false,
        restartNeeded: false,
    },
    earlyVerifiedBotDeveloper: {
        type: OptionType.BOOLEAN,
        description: "Show Early Verified Bot Developer badge on your profile (local only)",
        default: false,
        restartNeeded: false,
    },
    activeDeveloper: {
        type: OptionType.BOOLEAN,
        description: "Show Active Developer badge on your profile (local only)",
        default: false,
        restartNeeded: false,
    },
});

function isSelf(userId: string): boolean {
    return UserStore.getCurrentUser()?.id === userId;
}

const staffBadge: ProfileBadge = {
    id: "local_dev_badges_staff",
    description: "Discord Staff",
    iconSrc: `${CDN}/5e74e9b61934fc1f67c65515d1f7e60d.png`,
    link: "https://discord.com/company",
    position: BadgePosition.START,
    shouldShow: ({ userId }) => isSelf(userId) && settings.store.discordStaff,
};

const earlyVerifiedBotDevBadge: ProfileBadge = {
    id: "local_dev_badges_early_verified_bot_developer",
    description: "Early Verified Bot Developer",
    iconSrc: `${CDN}/6df5892e0f35b051f8b61eace34f4967.png`,
    link: "https://support-dev.discord.com/hc/en-us/articles/10113997751447",
    position: BadgePosition.START,
    shouldShow: ({ userId }) => isSelf(userId) && settings.store.earlyVerifiedBotDeveloper,
};

const activeDeveloperBadge: ProfileBadge = {
    id: "local_dev_badges_active_developer",
    description: "Active Developer",
    iconSrc: `${CDN}/6bdc42827a38498929a4920da12695d9.png`,
    link: "https://support-dev.discord.com/hc/en-us/articles/10113997751447",
    position: BadgePosition.START,
    shouldShow: ({ userId }) => isSelf(userId) && settings.store.activeDeveloper,
};

const ALL_BADGES = [staffBadge, earlyVerifiedBotDevBadge, activeDeveloperBadge];

export default definePlugin({
    name: "LocalDevBadges",
    description:
        "Locally toggle Discord Staff, Early Verified Bot Developer, and Active Developer badges on your own profile. Cosmetic only — others cannot see them.",
    authors: [{ name: "Nandak070", id: 1219803151180370021n }],
    settings,

    start() {
        for (const badge of ALL_BADGES) addProfileBadge(badge);
    },

    stop() {
        for (const badge of ALL_BADGES) removeProfileBadge(badge);
    },
});
