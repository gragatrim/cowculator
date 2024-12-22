export interface ClientResponse {
  type: string;
  gameVersion: string;
  versionTimestamp: string;
  currentTimestamp: string;
  levelExperienceTable: number[];
  skillDetailMap: { [key: string]: ActionCategoryDetailMap };
  abilityDetailMap: { [key: string]: AbilityDetailMap };
  abilitySlotsLevelRequirementList: number[];
  itemDetailMap: { [key: string]: ItemDetail };
  itemCategoryDetailMap: ItemCategoryDetailMap;
  itemLocationDetailMap: { [key: string]: ItemLocationDetailMap };
  equipmentTypeDetailMap: { [key: string]: ActionCategoryDetailMap };
  combatStyleDetailMap: CombatStyleDetailMap;
  damageTypeDetailMap: DamageTypeDetailMap;
  combatTriggerDependencyDetailMap: CombatTriggerDependencyDetailMap;
  combatTriggerConditionDetailMap: { [key: string]: CombatTrigger };
  combatTriggerComparatorDetailMap: CombatTriggerComparatorDetailMap;
  enhancementLevelSuccessRateTable: number[];
  enhancementLevelTotalBonusMultiplierTable: number[];
  actionDetailMap: { [key: string]: ActionDetailMap };
  actionTypeDetailMap: { [key: string]: ActionTypeDetailMap };
  actionCategoryDetailMap: { [key: string]: ActionCategoryDetailMap };
  buffTypeDetailMap: { [key: string]: BuffTypeDetailMap };
  cowbellBundleDetailMap: { [key: string]: CowbellBundleDetailMap };
  buyableUpgradeDetailMap: { [key: string]: BuyableUpgradeDetailMap };
  chatIconDetailMap: { [key: string]: ChatIconDetailMap };
  communityBuffTypeDetailMap: CommunityBuffTypeDetailMap;
}

export interface AbilityDetailMap {
  hrid: string;
  name: string;
  description: string;
  manaCost: number;
  cooldownDuration: number;
  isSpecialAbility: boolean;
  abilityEffects: AbilityEffect[];
  defaultCombatTriggers: DefaultCombatTrigger[];
  sortIndex: number;
}

export interface AbilityEffect {
  targetType: TargetType;
  effectType: EffectType;
  combatStyleHrid: CombatStyleHrid;
  damageType: DamageType;
  baseDamageFlat: number;
  baseDamageFlatLevelBonus: number;
  baseDamageRatio: number;
  baseDamageRatioLevelBonus: number;
  bonusAccuracyRatio: number;
  bonusAccuracyRatioLevelBonus: number;
  damageOverTimeRatio: number;
  damageOverTimeDuration: number;
  stunChance: number;
  stunDuration: number;
  buffs: Buff[] | null;
}

export interface Buff {
  uniqueHrid: string;
  typeHrid: string;
  ratioBoost: number;
  ratioBoostLevelBonus: number;
  flatBoost: number;
  flatBoostLevelBonus: number;
  startTime: string;
  duration: number;
}

export enum CombatStyleHrid {
  CombatStylesMagic = "/combat_styles/magic",
  CombatStylesRanged = "/combat_styles/ranged",
  CombatStylesSlash = "/combat_styles/slash",
  CombatStylesSmash = "/combat_styles/smash",
  CombatStylesStab = "/combat_styles/stab",
  Empty = "",
}

export enum DamageType {
  DamageTypesFire = "/damage_types/fire",
  DamageTypesNature = "/damage_types/nature",
  DamageTypesPhysical = "/damage_types/physical",
  DamageTypesWater = "/damage_types/water",
  Empty = "",
}

export enum EffectType {
  AbilityEffectTypesBuff = "/ability_effect_types/buff",
  AbilityEffectTypesDamage = "/ability_effect_types/damage",
  AbilityEffectTypesHeal = "/ability_effect_types/heal",
}

export enum TargetType {
  AllEnemies = "all enemies",
  Enemy = "enemy",
  Self = "self",
}

export interface DefaultCombatTrigger {
  dependencyHrid: DependencyHrid;
  conditionHrid: string;
  comparatorHrid: ComparatorHrid;
  value: number;
}

export enum ComparatorHrid {
  CombatTriggerComparatorsGreaterThanEqual =
  "/combat_trigger_comparators/greater_than_equal",
  CombatTriggerComparatorsIsActive = "/combat_trigger_comparators/is_active",
  CombatTriggerComparatorsIsInactive =
  "/combat_trigger_comparators/is_inactive",
  CombatTriggerComparatorsLessThanEqual =
  "/combat_trigger_comparators/less_than_equal",
}

export enum DependencyHrid {
  CombatTriggerDependenciesAllEnemies =
  "/combat_trigger_dependencies/all_enemies",
  CombatTriggerDependenciesSelf = "/combat_trigger_dependencies/self",
  CombatTriggerDependenciesTargetedEnemy =
  "/combat_trigger_dependencies/targeted_enemy",
}

export interface ActionTypeDetailMap {
  hrid: string;
  name: string;
  sortIndex: number;
}

export interface ActionCategoryDetailMap {
  hrid: string;
  name: string;
  sortIndex: number;
  allowValue?: boolean;
  itemLocationHrid?: string;
  pluralName?: string;
}

export interface ActionDetailMap {
  hrid: string;
  function: ActionFunction;
  type: ActionType;
  category: string;
  name: string;
  levelRequirement: LevelRequirement;
  baseTimeCost: number;
  experienceGain: ExperienceGain;
  dropTable: DropTable[] | null;
  rareDropTable: DropTable[] | null;
  upgradeItemHrid: string;
  inputItems: Cost[] | null;
  outputItems: Cost[] | null;
  combatZoneInfo: CombatZoneInfo | null;
  sortIndex: number;
}

export interface DropTable {
  itemHrid: string;
  dropRate: number;
  minCount: number;
  maxCount: number;
  minEliteTier: number;
}

export interface ExperienceGain {
  skillHrid: SkillHrid;
  value: number;
}

export enum SkillHrid {
  Empty = "",
  SkillsAttack = "/skills/attack",
  SkillsBrewing = "/skills/brewing",
  SkillsCheesesmithing = "/skills/cheesesmithing",
  SkillsCooking = "/skills/cooking",
  SkillsCrafting = "/skills/crafting",
  SkillsDefense = "/skills/defense",
  SkillsEnhancing = "/skills/enhancing",
  SkillsForaging = "/skills/foraging",
  SkillsIntelligence = "/skills/intelligence",
  SkillsMagic = "/skills/magic",
  SkillsMilking = "/skills/milking",
  SkillsPower = "/skills/power",
  SkillsRanged = "/skills/ranged",
  SkillsTailoring = "/skills/tailoring",
  SkillsWoodcutting = "/skills/woodcutting",
}

export enum ActionFunction {
  Combat = "/action_functions/combat",
  Enhancing = "/action_functions/enhancing",
  Gathering = "/action_functions/gathering",
  Production = "/action_functions/production",
}

export interface Cost {
  itemHrid: string;
  count: number;
}

export interface LevelRequirement {
  skillHrid: SkillHrid;
  level: number;
}

export interface CombatZoneInfo {
  fightInfo: FightInfo;
}

export interface FightInfo {
  randomSpawnInfo: RandomSpawnInfo;
}

export interface RandomSpawnInfo {
  maxSpawnCount: number;
  maxTotalStrength: number;
  spawns: Spawn[] | null;
}

export interface Spawn {
  combatMonsterHrid: string;
  rate: number;
  strength: number;
}

export enum ActionType {
  Brewing = "/action_types/brewing",
  Cheesesmithing = "/action_types/cheesesmithing",
  Combat = "/action_types/combat",
  Cooking = "/action_types/cooking",
  Crafting = "/action_types/crafting",
  Enhancing = "/action_types/enhancing",
  Foraging = "/action_types/foraging",
  Milking = "/action_types/milking",
  Tailoring = "/action_types/tailoring",
  Woodcutting = "/action_types/woodcutting",
}

export interface BuffTypeDetailMap {
  hrid: string;
  isCombat: boolean;
  name: string;
  description: string;
  debuffDescription: string;
  sortIndex: number;
}

export interface BuyableUpgradeDetailMap {
  hrid: string;
  name: Name;
  cost: Cost;
  hasBuyLimit: boolean;
  buyLimit: number;
  offlineHourCount: number;
  marketListingCount: number;
  actionQueueCount: number;
  sortIndex: number;
}

export enum Name {
  The1ActionQueue = "+1 Action Queue",
  The1HourOfflineProgress = "+1 Hour Offline Progress",
  The1MarketListing = "+1 Market Listing",
}

export interface ChatIconDetailMap {
  hrid: string;
  name: string;
  isSpecial: boolean;
  cowbellCost: number;
  sortIndex: number;
}

export interface Ability {
  abilityHrid: string;
  level: number;
}

export interface CombatDetails {
  currentHitpoints: number;
  maxHitpoints: number;
  currentManapoints: number;
  maxManapoints: number;
  stabAccuracyRating: number;
  slashAccuracyRating: number;
  smashAccuracyRating: number;
  rangedAccuracyRating: number;
  stabMaxDamage: number;
  slashMaxDamage: number;
  smashMaxDamage: number;
  rangedMaxDamage: number;
  magicMaxDamage: number;
  stabEvasionRating: number;
  slashEvasionRating: number;
  smashEvasionRating: number;
  rangedEvasionRating: number;
  totalArmor: number;
  totalWaterResistance: number;
  totalNatureResistance: number;
  totalFireResistance: number;
  combatLevel: number;
  staminaLevel: number;
  intelligenceLevel: number;
  attackLevel: number;
  powerLevel: number;
  defenseLevel: number;
  rangedLevel: number;
  magicLevel: number;
  combatStats: Combat;
}

export interface Combat {
  combatStyleHrids: CombatStyleHrid[] | null;
  damageType: DamageType;
  attackInterval: number;
  criticalRate: number;
  criticalDamage: number;
  stabAccuracy: number;
  slashAccuracy: number;
  smashAccuracy: number;
  rangedAccuracy: number;
  stabDamage: number;
  slashDamage: number;
  smashDamage: number;
  rangedDamage: number;
  magicDamage: number;
  physicalAmplify: number;
  waterAmplify: number;
  natureAmplify: number;
  fireAmplify: number;
  healingAmplify: number;
  physicalReflectPower: number;
  maxHitpoints: number;
  maxManapoints: number;
  stabEvasion: number;
  slashEvasion: number;
  smashEvasion: number;
  rangedEvasion: number;
  armor: number;
  waterResistance: number;
  natureResistance: number;
  fireResistance: number;
  lifeSteal: number;
  HPRegen: number;
  MPRegen: number;
  combatDropRate: number;
  combatDropQuantity: number;
  combatRareFind: number;
  combatExperience: number;
  foodSlots: number;
  drinkSlots: number;
}

export interface CombatStyleDetailMap {
  "/combat_styles/heal": CombatStylesHeal;
  "/combat_styles/magic": CombatStylesHeal;
  "/combat_styles/ranged": CombatStylesHeal;
  "/combat_styles/slash": CombatStylesHeal;
  "/combat_styles/smash": CombatStylesHeal;
  "/combat_styles/stab": CombatStylesHeal;
}

export interface CombatStylesHeal {
  hrid: string;
  name: string;
}

export interface CombatTriggerComparatorDetailMap {
  "/combat_trigger_comparators/greater_than_equal": ActionCategoryDetailMap;
  "/combat_trigger_comparators/is_active": ActionCategoryDetailMap;
  "/combat_trigger_comparators/is_inactive": ActionCategoryDetailMap;
  "/combat_trigger_comparators/less_than_equal": ActionCategoryDetailMap;
}

export interface CombatTrigger {
  hrid: string;
  name: string;
  isSingleTarget: boolean;
  isMultiTarget: boolean;
  allowedComparatorHrids?: ComparatorHrid[];
  sortIndex: number;
}

export interface CombatTriggerDependencyDetailMap {
  "/combat_trigger_dependencies/all_allies": CombatTrigger;
  "/combat_trigger_dependencies/all_enemies": CombatTrigger;
  "/combat_trigger_dependencies/self": CombatTrigger;
  "/combat_trigger_dependencies/targeted_enemy": CombatTrigger;
}

export interface CommunityBuffTypeDetailMap {
  "/community_buff_types/combat_drop_quantity":
  CommunityBuffTypesCombatDropQuantity;
  "/community_buff_types/enhancing_speed": CommunityBuffTypesEnhancingSpeed;
  "/community_buff_types/experience": CommunityBuffTypesExperience;
  "/community_buff_types/gathering_quantity":
  CommunityBuffTypesGatheringQuantity;
  "/community_buff_types/production_efficiency":
  CommunityBuffTypesProductionEfficiency;
}

export interface CommunityBuffTypesCombatDropQuantity {
  hrid: string;
  name: string;
  usableInActionTypeMap:
  CommunityBuffTypesCombatDropQuantityUsableInActionTypeMap;
  buff: Buff;
  description: string;
  cowbellCost: number;
  sortIndex: number;
}

export interface CommunityBuffTypesCombatDropQuantityUsableInActionTypeMap {
  "/action_types/combat": boolean;
}

export interface CommunityBuffTypesEnhancingSpeed {
  hrid: string;
  name: string;
  usableInActionTypeMap: CommunityBuffTypesEnhancingSpeedUsableInActionTypeMap;
  buff: Buff;
  description: string;
  cowbellCost: number;
  sortIndex: number;
}

export interface CommunityBuffTypesEnhancingSpeedUsableInActionTypeMap {
  "/action_types/enhancing": boolean;
}

export interface CommunityBuffTypesExperience {
  hrid: string;
  name: string;
  usableInActionTypeMap: { [key: string]: boolean };
  buff: Buff;
  description: string;
  cowbellCost: number;
  sortIndex: number;
}

export interface CommunityBuffTypesGatheringQuantity {
  hrid: string;
  name: string;
  usableInActionTypeMap:
  CommunityBuffTypesGatheringQuantityUsableInActionTypeMap;
  buff: Buff;
  description: string;
  cowbellCost: number;
  sortIndex: number;
}

export interface CommunityBuffTypesGatheringQuantityUsableInActionTypeMap {
  "/action_types/foraging": boolean;
  "/action_types/milking": boolean;
  "/action_types/woodcutting": boolean;
}

export interface CommunityBuffTypesProductionEfficiency {
  hrid: string;
  name: string;
  usableInActionTypeMap:
  CommunityBuffTypesProductionEfficiencyUsableInActionTypeMap;
  buff: Buff;
  description: string;
  cowbellCost: number;
  sortIndex: number;
}

export interface CommunityBuffTypesProductionEfficiencyUsableInActionTypeMap {
  "/action_types/brewing": boolean;
  "/action_types/cheesesmithing": boolean;
  "/action_types/cooking": boolean;
  "/action_types/crafting": boolean;
  "/action_types/tailoring": boolean;
}

export interface CowbellBundleDetailMap {
  id: string;
  name: string;
  quantity: number;
  dollarPrice: number;
  sortIndex: number;
}

export interface DamageTypeDetailMap {
  "/damage_types/fire": CombatStylesHeal;
  "/damage_types/nature": CombatStylesHeal;
  "/damage_types/physical": CombatStylesHeal;
  "/damage_types/water": CombatStylesHeal;
}

export interface ItemCategoryDetailMap {
  "/item_categories/ability_book": ActionCategoryDetailMap;
  "/item_categories/currency": ActionCategoryDetailMap;
  "/item_categories/drink": ActionCategoryDetailMap;
  "/item_categories/equipment": ActionCategoryDetailMap;
  "/item_categories/food": ActionCategoryDetailMap;
  "/item_categories/loot": ActionCategoryDetailMap;
  "/item_categories/resource": ActionCategoryDetailMap;
}

export interface ItemDetailMap {
  "/items/abyssal_essence": ItemDetail;
  "/items/acrobatic_hood": ItemDetail;
  "/items/acrobats_ribbon": ItemDetail;
  "/items/advanced_task_badge": ItemDetail;
  "/items/alchemists_bottoms": ItemDetail;
  "/items/alchemists_top": ItemDetail;
  "/items/alchemy_essence": ItemDetail;
  "/items/alchemy_tea": ItemDetail;
  "/items/amber": ItemDetail;
  "/items/amethyst": ItemDetail;
  "/items/apple": ItemDetail;
  "/items/apple_gummy": ItemDetail;
  "/items/apple_yogurt": ItemDetail;
  "/items/aqua_arrow": ItemDetail;
  "/items/aqua_aura": ItemDetail;
  "/items/aqua_essence": ItemDetail;
  "/items/arabica_coffee_bean": ItemDetail;
  "/items/arcane_bow": ItemDetail;
  "/items/arcane_crossbow": ItemDetail;
  "/items/arcane_fire_staff": ItemDetail;
  "/items/arcane_log": ItemDetail;
  "/items/arcane_lumber": ItemDetail;
  "/items/arcane_nature_staff": ItemDetail;
  "/items/arcane_reflection": ItemDetail;
  "/items/arcane_shield": ItemDetail;
  "/items/arcane_water_staff": ItemDetail;
  "/items/artisan_tea": ItemDetail;
  "/items/attack_coffee": ItemDetail;
  "/items/azure_alembic": ItemDetail;
  "/items/azure_boots": ItemDetail;
  "/items/azure_brush": ItemDetail;
  "/items/azure_buckler": ItemDetail;
  "/items/azure_bulwark": ItemDetail;
  "/items/azure_cheese": ItemDetail;
  "/items/azure_chisel": ItemDetail;
  "/items/azure_enhancer": ItemDetail;
  "/items/azure_gauntlets": ItemDetail;
  "/items/azure_hammer": ItemDetail;
  "/items/azure_hatchet": ItemDetail;
  "/items/azure_helmet": ItemDetail;
  "/items/azure_mace": ItemDetail;
  "/items/azure_milk": ItemDetail;
  "/items/azure_needle": ItemDetail;
  "/items/azure_plate_body": ItemDetail;
  "/items/azure_plate_legs": ItemDetail;
  "/items/azure_pot": ItemDetail;
  "/items/azure_shears": ItemDetail;
  "/items/azure_spatula": ItemDetail;
  "/items/azure_spear": ItemDetail;
  "/items/azure_sword": ItemDetail;
  "/items/bag_of_10_cowbells": ItemDetail;
  "/items/bamboo_boots": ItemDetail;
  "/items/bamboo_branch": ItemDetail;
  "/items/bamboo_fabric": ItemDetail;
  "/items/bamboo_gloves": ItemDetail;
  "/items/bamboo_hat": ItemDetail;
  "/items/bamboo_robe_bottoms": ItemDetail;
  "/items/bamboo_robe_top": ItemDetail;
  "/items/basic_task_badge": ItemDetail;
  "/items/bear_essence": ItemDetail;
  "/items/beast_boots": ItemDetail;
  "/items/beast_bracers": ItemDetail;
  "/items/beast_chaps": ItemDetail;
  "/items/beast_hide": ItemDetail;
  "/items/beast_hood": ItemDetail;
  "/items/beast_leather": ItemDetail;
  "/items/beast_tunic": ItemDetail;
  "/items/berserk": ItemDetail;
  "/items/birch_bow": ItemDetail;
  "/items/birch_crossbow": ItemDetail;
  "/items/birch_fire_staff": ItemDetail;
  "/items/birch_log": ItemDetail;
  "/items/birch_lumber": ItemDetail;
  "/items/birch_nature_staff": ItemDetail;
  "/items/birch_shield": ItemDetail;
  "/items/birch_water_staff": ItemDetail;
  "/items/bishops_codex": ItemDetail;
  "/items/bishops_scroll": ItemDetail;
  "/items/black_bear_fluff": ItemDetail;
  "/items/black_bear_shoes": ItemDetail;
  "/items/black_tea_leaf": ItemDetail;
  "/items/blackberry": ItemDetail;
  "/items/blackberry_cake": ItemDetail;
  "/items/blackberry_donut": ItemDetail;
  "/items/blessed_tea": ItemDetail;
  "/items/blue_key_fragment": ItemDetail;
  "/items/blueberry": ItemDetail;
  "/items/blueberry_cake": ItemDetail;
  "/items/blueberry_donut": ItemDetail;
  "/items/branch_of_insight": ItemDetail;
  "/items/brewers_bottoms": ItemDetail;
  "/items/brewers_top": ItemDetail;
  "/items/brewing_essence": ItemDetail;
  "/items/brewing_tea": ItemDetail;
  "/items/brown_key_fragment": ItemDetail;
  "/items/burble_alembic": ItemDetail;
  "/items/burble_boots": ItemDetail;
  "/items/burble_brush": ItemDetail;
  "/items/burble_buckler": ItemDetail;
  "/items/burble_bulwark": ItemDetail;
  "/items/burble_cheese": ItemDetail;
  "/items/burble_chisel": ItemDetail;
  "/items/burble_enhancer": ItemDetail;
  "/items/burble_gauntlets": ItemDetail;
  "/items/burble_hammer": ItemDetail;
  "/items/burble_hatchet": ItemDetail;
  "/items/burble_helmet": ItemDetail;
  "/items/burble_mace": ItemDetail;
  "/items/burble_milk": ItemDetail;
  "/items/burble_needle": ItemDetail;
  "/items/burble_plate_body": ItemDetail;
  "/items/burble_plate_legs": ItemDetail;
  "/items/burble_pot": ItemDetail;
  "/items/burble_shears": ItemDetail;
  "/items/burble_spatula": ItemDetail;
  "/items/burble_spear": ItemDetail;
  "/items/burble_sword": ItemDetail;
  "/items/burble_tea_leaf": ItemDetail;
  "/items/burning_key_fragment": ItemDetail;
  "/items/butter_of_proficiency": ItemDetail;
  "/items/catalyst_of_coinification": ItemDetail;
  "/items/catalyst_of_decomposition": ItemDetail;
  "/items/catalyst_of_transmutation": ItemDetail;
  "/items/catalytic_tea": ItemDetail;
  "/items/cedar_bow": ItemDetail;
  "/items/cedar_crossbow": ItemDetail;
  "/items/cedar_fire_staff": ItemDetail;
  "/items/cedar_log": ItemDetail;
  "/items/cedar_lumber": ItemDetail;
  "/items/cedar_nature_staff": ItemDetail;
  "/items/cedar_shield": ItemDetail;
  "/items/cedar_water_staff": ItemDetail;
  "/items/celestial_alembic": ItemDetail;
  "/items/celestial_brush": ItemDetail;
  "/items/celestial_chisel": ItemDetail;
  "/items/celestial_enhancer": ItemDetail;
  "/items/celestial_hammer": ItemDetail;
  "/items/celestial_hatchet": ItemDetail;
  "/items/celestial_needle": ItemDetail;
  "/items/celestial_pot": ItemDetail;
  "/items/celestial_shears": ItemDetail;
  "/items/celestial_spatula": ItemDetail;
  "/items/centaur_boots": ItemDetail;
  "/items/centaur_hoof": ItemDetail;
  "/items/channeling_coffee": ItemDetail;
  "/items/chaotic_chain": ItemDetail;
  "/items/chaotic_flail": ItemDetail;
  "/items/cheese": ItemDetail;
  "/items/cheese_alembic": ItemDetail;
  "/items/cheese_boots": ItemDetail;
  "/items/cheese_brush": ItemDetail;
  "/items/cheese_buckler": ItemDetail;
  "/items/cheese_bulwark": ItemDetail;
  "/items/cheese_chisel": ItemDetail;
  "/items/cheese_enhancer": ItemDetail;
  "/items/cheese_gauntlets": ItemDetail;
  "/items/cheese_hammer": ItemDetail;
  "/items/cheese_hatchet": ItemDetail;
  "/items/cheese_helmet": ItemDetail;
  "/items/cheese_mace": ItemDetail;
  "/items/cheese_needle": ItemDetail;
  "/items/cheese_plate_body": ItemDetail;
  "/items/cheese_plate_legs": ItemDetail;
  "/items/cheese_pot": ItemDetail;
  "/items/cheese_shears": ItemDetail;
  "/items/cheese_spatula": ItemDetail;
  "/items/cheese_spear": ItemDetail;
  "/items/cheese_sword": ItemDetail;
  "/items/cheesemakers_bottoms": ItemDetail;
  "/items/cheesemakers_top": ItemDetail;
  "/items/cheesesmithing_essence": ItemDetail;
  "/items/cheesesmithing_tea": ItemDetail;
  "/items/chefs_bottoms": ItemDetail;
  "/items/chefs_top": ItemDetail;
  "/items/chimerical_chest": ItemDetail;
  "/items/chimerical_chest_key": ItemDetail;
  "/items/chimerical_entry_key": ItemDetail;
  "/items/chimerical_essence": ItemDetail;
  "/items/chimerical_quiver": ItemDetail;
  "/items/chimerical_token": ItemDetail;
  "/items/chrono_gloves": ItemDetail;
  "/items/chrono_sphere": ItemDetail;
  "/items/cleave": ItemDetail;
  "/items/cocoon": ItemDetail;
  "/items/coin": ItemDetail;
  "/items/collectors_boots": ItemDetail;
  "/items/colossus_core": ItemDetail;
  "/items/colossus_plate_body": ItemDetail;
  "/items/colossus_plate_legs": ItemDetail;
  "/items/cooking_essence": ItemDetail;
  "/items/cooking_tea": ItemDetail;
  "/items/cotton": ItemDetail;
  "/items/cotton_boots": ItemDetail;
  "/items/cotton_fabric": ItemDetail;
  "/items/cotton_gloves": ItemDetail;
  "/items/cotton_hat": ItemDetail;
  "/items/cotton_robe_bottoms": ItemDetail;
  "/items/cotton_robe_top": ItemDetail;
  "/items/cowbell": ItemDetail;
  "/items/crab_pincer": ItemDetail;
  "/items/crafters_bottoms": ItemDetail;
  "/items/crafters_top": ItemDetail;
  "/items/crafting_essence": ItemDetail;
  "/items/crafting_tea": ItemDetail;
  "/items/crimson_alembic": ItemDetail;
  "/items/crimson_boots": ItemDetail;
  "/items/crimson_brush": ItemDetail;
  "/items/crimson_buckler": ItemDetail;
  "/items/crimson_bulwark": ItemDetail;
  "/items/crimson_cheese": ItemDetail;
  "/items/crimson_chisel": ItemDetail;
  "/items/crimson_enhancer": ItemDetail;
  "/items/crimson_gauntlets": ItemDetail;
  "/items/crimson_hammer": ItemDetail;
  "/items/crimson_hatchet": ItemDetail;
  "/items/crimson_helmet": ItemDetail;
  "/items/crimson_mace": ItemDetail;
  "/items/crimson_milk": ItemDetail;
  "/items/crimson_needle": ItemDetail;
  "/items/crimson_plate_body": ItemDetail;
  "/items/crimson_plate_legs": ItemDetail;
  "/items/crimson_pot": ItemDetail;
  "/items/crimson_shears": ItemDetail;
  "/items/crimson_spatula": ItemDetail;
  "/items/crimson_spear": ItemDetail;
  "/items/crimson_sword": ItemDetail;
  "/items/crippling_slash": ItemDetail;
  "/items/critical_aura": ItemDetail;
  "/items/critical_coffee": ItemDetail;
  "/items/crushed_amber": ItemDetail;
  "/items/crushed_amethyst": ItemDetail;
  "/items/crushed_garnet": ItemDetail;
  "/items/crushed_jade": ItemDetail;
  "/items/crushed_moonstone": ItemDetail;
  "/items/crushed_pearl": ItemDetail;
  "/items/crushed_philosophers_stone": ItemDetail;
  "/items/crushed_sunstone": ItemDetail;
  "/items/cupcake": ItemDetail;
  "/items/cursed_ball": ItemDetail;
  "/items/cursed_bow": ItemDetail;
  "/items/dairyhands_bottoms": ItemDetail;
  "/items/dairyhands_top": ItemDetail;
  "/items/dark_key_fragment": ItemDetail;
  "/items/defense_coffee": ItemDetail;
  "/items/demonic_core": ItemDetail;
  "/items/demonic_plate_body": ItemDetail;
  "/items/demonic_plate_legs": ItemDetail;
  "/items/dodocamel_gauntlets": ItemDetail;
  "/items/dodocamel_plume": ItemDetail;
  "/items/donut": ItemDetail;
  "/items/dragon_fruit": ItemDetail;
  "/items/dragon_fruit_gummy": ItemDetail;
  "/items/dragon_fruit_yogurt": ItemDetail;
  "/items/earrings_of_armor": ItemDetail;
  "/items/earrings_of_critical_strike": ItemDetail;
  "/items/earrings_of_essence_find": ItemDetail;
  "/items/earrings_of_gathering": ItemDetail;
  "/items/earrings_of_rare_find": ItemDetail;
  "/items/earrings_of_regeneration": ItemDetail;
  "/items/earrings_of_resistance": ItemDetail;
  "/items/efficiency_tea": ItemDetail;
  "/items/egg": ItemDetail;
  "/items/elemental_affinity": ItemDetail;
  "/items/elusiveness": ItemDetail;
  "/items/emp_tea_leaf": ItemDetail;
  "/items/enchanted_chest": ItemDetail;
  "/items/enchanted_chest_key": ItemDetail;
  "/items/enchanted_cloak": ItemDetail;
  "/items/enchanted_entry_key": ItemDetail;
  "/items/enchanted_essence": ItemDetail;
  "/items/enchanted_gloves": ItemDetail;
  "/items/enchanted_token": ItemDetail;
  "/items/enhancers_bottoms": ItemDetail;
  "/items/enhancers_top": ItemDetail;
  "/items/enhancing_essence": ItemDetail;
  "/items/enhancing_tea": ItemDetail;
  "/items/entangle": ItemDetail;
  "/items/excelsa_coffee_bean": ItemDetail;
  "/items/expert_task_badge": ItemDetail;
  "/items/eye_of_the_watcher": ItemDetail;
  "/items/eye_watch": ItemDetail;
  "/items/eyessence": ItemDetail;
  "/items/fierce_aura": ItemDetail;
  "/items/fieriosa_coffee_bean": ItemDetail;
  "/items/fighter_necklace": ItemDetail;
  "/items/fireball": ItemDetail;
  "/items/firestorm": ItemDetail;
  "/items/flame_arrow": ItemDetail;
  "/items/flame_aura": ItemDetail;
  "/items/flame_blast": ItemDetail;
  "/items/flaming_cloth": ItemDetail;
  "/items/flaming_robe_bottoms": ItemDetail;
  "/items/flaming_robe_top": ItemDetail;
  "/items/flax": ItemDetail;
  "/items/fluffy_red_hat": ItemDetail;
  "/items/foragers_bottoms": ItemDetail;
  "/items/foragers_top": ItemDetail;
  "/items/foraging_essence": ItemDetail;
  "/items/foraging_tea": ItemDetail;
  "/items/frenzy": ItemDetail;
  "/items/frost_sphere": ItemDetail;
  "/items/frost_staff": ItemDetail;
  "/items/frost_surge": ItemDetail;
  "/items/garnet": ItemDetail;
  "/items/gathering_tea": ItemDetail;
  "/items/gator_vest": ItemDetail;
  "/items/giant_pouch": ItemDetail;
  "/items/ginkgo_bow": ItemDetail;
  "/items/ginkgo_crossbow": ItemDetail;
  "/items/ginkgo_fire_staff": ItemDetail;
  "/items/ginkgo_log": ItemDetail;
  "/items/ginkgo_lumber": ItemDetail;
  "/items/ginkgo_nature_staff": ItemDetail;
  "/items/ginkgo_shield": ItemDetail;
  "/items/ginkgo_water_staff": ItemDetail;
  "/items/gluttonous_energy": ItemDetail;
  "/items/gluttonous_pouch": ItemDetail;
  "/items/gobo_boomstick": ItemDetail;
  "/items/gobo_boots": ItemDetail;
  "/items/gobo_bracers": ItemDetail;
  "/items/gobo_chaps": ItemDetail;
  "/items/gobo_defender": ItemDetail;
  "/items/gobo_essence": ItemDetail;
  "/items/gobo_hide": ItemDetail;
  "/items/gobo_hood": ItemDetail;
  "/items/gobo_leather": ItemDetail;
  "/items/gobo_rag": ItemDetail;
  "/items/gobo_shooter": ItemDetail;
  "/items/gobo_slasher": ItemDetail;
  "/items/gobo_smasher": ItemDetail;
  "/items/gobo_stabber": ItemDetail;
  "/items/gobo_tunic": ItemDetail;
  "/items/goggles": ItemDetail;
  "/items/golem_essence": ItemDetail;
  "/items/gourmet_tea": ItemDetail;
  "/items/granite_bludgeon": ItemDetail;
  "/items/green_key_fragment": ItemDetail;
  "/items/green_tea_leaf": ItemDetail;
  "/items/griffin_bulwark": ItemDetail;
  "/items/griffin_chaps": ItemDetail;
  "/items/griffin_leather": ItemDetail;
  "/items/griffin_talon": ItemDetail;
  "/items/griffin_tunic": ItemDetail;
  "/items/grizzly_bear_fluff": ItemDetail;
  "/items/grizzly_bear_shoes": ItemDetail;
  "/items/gummy": ItemDetail;
  "/items/guzzling_energy": ItemDetail;
  "/items/guzzling_pouch": ItemDetail;
  "/items/heal": ItemDetail;
  "/items/holy_alembic": ItemDetail;
  "/items/holy_boots": ItemDetail;
  "/items/holy_brush": ItemDetail;
  "/items/holy_buckler": ItemDetail;
  "/items/holy_bulwark": ItemDetail;
  "/items/holy_cheese": ItemDetail;
  "/items/holy_chisel": ItemDetail;
  "/items/holy_enhancer": ItemDetail;
  "/items/holy_gauntlets": ItemDetail;
  "/items/holy_hammer": ItemDetail;
  "/items/holy_hatchet": ItemDetail;
  "/items/holy_helmet": ItemDetail;
  "/items/holy_mace": ItemDetail;
  "/items/holy_milk": ItemDetail;
  "/items/holy_needle": ItemDetail;
  "/items/holy_plate_body": ItemDetail;
  "/items/holy_plate_legs": ItemDetail;
  "/items/holy_pot": ItemDetail;
  "/items/holy_shears": ItemDetail;
  "/items/holy_spatula": ItemDetail;
  "/items/holy_spear": ItemDetail;
  "/items/holy_sword": ItemDetail;
  "/items/ice_spear": ItemDetail;
  "/items/icy_cloth": ItemDetail;
  "/items/icy_robe_bottoms": ItemDetail;
  "/items/icy_robe_top": ItemDetail;
  "/items/impale": ItemDetail;
  "/items/infernal_battlestaff": ItemDetail;
  "/items/infernal_ember": ItemDetail;
  "/items/insanity": ItemDetail;
  "/items/intelligence_coffee": ItemDetail;
  "/items/invincible": ItemDetail;
  "/items/jackalope_antler": ItemDetail;
  "/items/jackalope_staff": ItemDetail;
  "/items/jade": ItemDetail;
  "/items/jungle_essence": ItemDetail;
  "/items/knights_aegis": ItemDetail;
  "/items/knights_ingot": ItemDetail;
  "/items/large_artisans_crate": ItemDetail;
  "/items/large_meteorite_cache": ItemDetail;
  "/items/large_pouch": ItemDetail;
  "/items/large_treasure_chest": ItemDetail;
  "/items/liberica_coffee_bean": ItemDetail;
  "/items/linen_boots": ItemDetail;
  "/items/linen_fabric": ItemDetail;
  "/items/linen_gloves": ItemDetail;
  "/items/linen_hat": ItemDetail;
  "/items/linen_robe_bottoms": ItemDetail;
  "/items/linen_robe_top": ItemDetail;
  "/items/living_granite": ItemDetail;
  "/items/log": ItemDetail;
  "/items/lucky_coffee": ItemDetail;
  "/items/lumber": ItemDetail;
  "/items/lumberjacks_bottoms": ItemDetail;
  "/items/lumberjacks_top": ItemDetail;
  "/items/luna_robe_bottoms": ItemDetail;
  "/items/luna_robe_top": ItemDetail;
  "/items/luna_wing": ItemDetail;
  "/items/magic_coffee": ItemDetail;
  "/items/magicians_cloth": ItemDetail;
  "/items/magicians_hat": ItemDetail;
  "/items/magnet": ItemDetail;
  "/items/magnetic_gloves": ItemDetail;
  "/items/magnifying_glass": ItemDetail;
  "/items/maim": ItemDetail;
  "/items/mana_spring": ItemDetail;
  "/items/manticore_shield": ItemDetail;
  "/items/manticore_sting": ItemDetail;
  "/items/marine_chaps": ItemDetail;
  "/items/marine_scale": ItemDetail;
  "/items/marine_tunic": ItemDetail;
  "/items/marsberry": ItemDetail;
  "/items/marsberry_cake": ItemDetail;
  "/items/marsberry_donut": ItemDetail;
  "/items/medium_artisans_crate": ItemDetail;
  "/items/medium_meteorite_cache": ItemDetail;
  "/items/medium_pouch": ItemDetail;
  "/items/medium_treasure_chest": ItemDetail;
  "/items/milk": ItemDetail;
  "/items/milking_essence": ItemDetail;
  "/items/milking_tea": ItemDetail;
  "/items/minor_heal": ItemDetail;
  "/items/mirror_of_protection": ItemDetail;
  "/items/mooberry": ItemDetail;
  "/items/mooberry_cake": ItemDetail;
  "/items/mooberry_donut": ItemDetail;
  "/items/moolong_tea_leaf": ItemDetail;
  "/items/moonstone": ItemDetail;
  "/items/natures_veil": ItemDetail;
  "/items/necklace_of_efficiency": ItemDetail;
  "/items/necklace_of_speed": ItemDetail;
  "/items/necklace_of_wisdom": ItemDetail;
  "/items/orange": ItemDetail;
  "/items/orange_gummy": ItemDetail;
  "/items/orange_key_fragment": ItemDetail;
  "/items/orange_yogurt": ItemDetail;
  "/items/panda_fluff": ItemDetail;
  "/items/panda_gloves": ItemDetail;
  "/items/peach": ItemDetail;
  "/items/peach_gummy": ItemDetail;
  "/items/peach_yogurt": ItemDetail;
  "/items/pearl": ItemDetail;
  "/items/penetrating_shot": ItemDetail;
  "/items/penetrating_strike": ItemDetail;
  "/items/pestilent_shot": ItemDetail;
  "/items/philosophers_earrings": ItemDetail;
  "/items/philosophers_necklace": ItemDetail;
  "/items/philosophers_ring": ItemDetail;
  "/items/philosophers_stone": ItemDetail;
  "/items/pincer_gloves": ItemDetail;
  "/items/plum": ItemDetail;
  "/items/plum_gummy": ItemDetail;
  "/items/plum_yogurt": ItemDetail;
  "/items/poke": ItemDetail;
  "/items/polar_bear_fluff": ItemDetail;
  "/items/polar_bear_shoes": ItemDetail;
  "/items/power_coffee": ItemDetail;
  "/items/precision": ItemDetail;
  "/items/prime_catalyst": ItemDetail;
  "/items/processing_tea": ItemDetail;
  "/items/provoke": ItemDetail;
  "/items/puncture": ItemDetail;
  "/items/purple_key_fragment": ItemDetail;
  "/items/purpleheart_bow": ItemDetail;
  "/items/purpleheart_crossbow": ItemDetail;
  "/items/purpleheart_fire_staff": ItemDetail;
  "/items/purpleheart_log": ItemDetail;
  "/items/purpleheart_lumber": ItemDetail;
  "/items/purpleheart_nature_staff": ItemDetail;
  "/items/purpleheart_shield": ItemDetail;
  "/items/purpleheart_water_staff": ItemDetail;
  "/items/purples_gift": ItemDetail;
  "/items/quick_aid": ItemDetail;
  "/items/quick_shot": ItemDetail;
  "/items/radiant_boots": ItemDetail;
  "/items/radiant_fabric": ItemDetail;
  "/items/radiant_fiber": ItemDetail;
  "/items/radiant_gloves": ItemDetail;
  "/items/radiant_hat": ItemDetail;
  "/items/radiant_robe_bottoms": ItemDetail;
  "/items/radiant_robe_top": ItemDetail;
  "/items/rain_of_arrows": ItemDetail;
  "/items/rainbow_alembic": ItemDetail;
  "/items/rainbow_boots": ItemDetail;
  "/items/rainbow_brush": ItemDetail;
  "/items/rainbow_buckler": ItemDetail;
  "/items/rainbow_bulwark": ItemDetail;
  "/items/rainbow_cheese": ItemDetail;
  "/items/rainbow_chisel": ItemDetail;
  "/items/rainbow_enhancer": ItemDetail;
  "/items/rainbow_gauntlets": ItemDetail;
  "/items/rainbow_hammer": ItemDetail;
  "/items/rainbow_hatchet": ItemDetail;
  "/items/rainbow_helmet": ItemDetail;
  "/items/rainbow_mace": ItemDetail;
  "/items/rainbow_milk": ItemDetail;
  "/items/rainbow_needle": ItemDetail;
  "/items/rainbow_plate_body": ItemDetail;
  "/items/rainbow_plate_legs": ItemDetail;
  "/items/rainbow_pot": ItemDetail;
  "/items/rainbow_shears": ItemDetail;
  "/items/rainbow_spatula": ItemDetail;
  "/items/rainbow_spear": ItemDetail;
  "/items/rainbow_sword": ItemDetail;
  "/items/ranged_coffee": ItemDetail;
  "/items/ranger_necklace": ItemDetail;
  "/items/red_culinary_hat": ItemDetail;
  "/items/red_panda_fluff": ItemDetail;
  "/items/red_tea_leaf": ItemDetail;
  "/items/redwood_bow": ItemDetail;
  "/items/redwood_crossbow": ItemDetail;
  "/items/redwood_fire_staff": ItemDetail;
  "/items/redwood_log": ItemDetail;
  "/items/redwood_lumber": ItemDetail;
  "/items/redwood_nature_staff": ItemDetail;
  "/items/redwood_shield": ItemDetail;
  "/items/redwood_water_staff": ItemDetail;
  "/items/regal_jewel": ItemDetail;
  "/items/regal_sword": ItemDetail;
  "/items/rejuvenate": ItemDetail;
  "/items/reptile_boots": ItemDetail;
  "/items/reptile_bracers": ItemDetail;
  "/items/reptile_chaps": ItemDetail;
  "/items/reptile_hide": ItemDetail;
  "/items/reptile_hood": ItemDetail;
  "/items/reptile_leather": ItemDetail;
  "/items/reptile_tunic": ItemDetail;
  "/items/revenant_anima": ItemDetail;
  "/items/revenant_chaps": ItemDetail;
  "/items/revenant_tunic": ItemDetail;
  "/items/revive": ItemDetail;
  "/items/ring_of_armor": ItemDetail;
  "/items/ring_of_critical_strike": ItemDetail;
  "/items/ring_of_essence_find": ItemDetail;
  "/items/ring_of_gathering": ItemDetail;
  "/items/ring_of_rare_find": ItemDetail;
  "/items/ring_of_regeneration": ItemDetail;
  "/items/ring_of_resistance": ItemDetail;
  "/items/robusta_coffee_bean": ItemDetail;
  "/items/rough_boots": ItemDetail;
  "/items/rough_bracers": ItemDetail;
  "/items/rough_chaps": ItemDetail;
  "/items/rough_hide": ItemDetail;
  "/items/rough_hood": ItemDetail;
  "/items/rough_leather": ItemDetail;
  "/items/rough_tunic": ItemDetail;
  "/items/royal_cloth": ItemDetail;
  "/items/royal_fire_robe_bottoms": ItemDetail;
  "/items/royal_fire_robe_top": ItemDetail;
  "/items/royal_nature_robe_bottoms": ItemDetail;
  "/items/royal_nature_robe_top": ItemDetail;
  "/items/royal_water_robe_bottoms": ItemDetail;
  "/items/royal_water_robe_top": ItemDetail;
  "/items/scratch": ItemDetail;
  "/items/shard_of_protection": ItemDetail;
  "/items/shoebill_feather": ItemDetail;
  "/items/shoebill_shoes": ItemDetail;
  "/items/sighted_bracers": ItemDetail;
  "/items/silencing_shot": ItemDetail;
  "/items/silk_boots": ItemDetail;
  "/items/silk_fabric": ItemDetail;
  "/items/silk_gloves": ItemDetail;
  "/items/silk_hat": ItemDetail;
  "/items/silk_robe_bottoms": ItemDetail;
  "/items/silk_robe_top": ItemDetail;
  "/items/sinister_cape": ItemDetail;
  "/items/sinister_chest": ItemDetail;
  "/items/sinister_chest_key": ItemDetail;
  "/items/sinister_entry_key": ItemDetail;
  "/items/sinister_essence": ItemDetail;
  "/items/sinister_token": ItemDetail;
  "/items/smack": ItemDetail;
  "/items/small_artisans_crate": ItemDetail;
  "/items/small_meteorite_cache": ItemDetail;
  "/items/small_pouch": ItemDetail;
  "/items/small_treasure_chest": ItemDetail;
  "/items/smoke_burst": ItemDetail;
  "/items/snail_shell": ItemDetail;
  "/items/snail_shell_helmet": ItemDetail;
  "/items/snake_fang": ItemDetail;
  "/items/snake_fang_dirk": ItemDetail;
  "/items/sorcerer_boots": ItemDetail;
  "/items/sorcerer_essence": ItemDetail;
  "/items/sorcerers_sole": ItemDetail;
  "/items/soul_fragment": ItemDetail;
  "/items/soul_hunter_crossbow": ItemDetail;
  "/items/spaceberry": ItemDetail;
  "/items/spaceberry_cake": ItemDetail;
  "/items/spaceberry_donut": ItemDetail;
  "/items/spacia_coffee_bean": ItemDetail;
  "/items/speed_aura": ItemDetail;
  "/items/spike_shell": ItemDetail;
  "/items/spiked_bulwark": ItemDetail;
  "/items/stalactite_shard": ItemDetail;
  "/items/stalactite_spear": ItemDetail;
  "/items/stamina_coffee": ItemDetail;
  "/items/star_fragment": ItemDetail;
  "/items/star_fruit": ItemDetail;
  "/items/star_fruit_gummy": ItemDetail;
  "/items/star_fruit_yogurt": ItemDetail;
  "/items/steady_shot": ItemDetail;
  "/items/stone_key_fragment": ItemDetail;
  "/items/strawberry": ItemDetail;
  "/items/strawberry_cake": ItemDetail;
  "/items/strawberry_donut": ItemDetail;
  "/items/stunning_blow": ItemDetail;
  "/items/sugar": ItemDetail;
  "/items/sundering_crossbow": ItemDetail;
  "/items/sundering_jewel": ItemDetail;
  "/items/sunstone": ItemDetail;
  "/items/super_alchemy_tea": ItemDetail;
  "/items/super_attack_coffee": ItemDetail;
  "/items/super_brewing_tea": ItemDetail;
  "/items/super_cheesesmithing_tea": ItemDetail;
  "/items/super_cooking_tea": ItemDetail;
  "/items/super_crafting_tea": ItemDetail;
  "/items/super_defense_coffee": ItemDetail;
  "/items/super_enhancing_tea": ItemDetail;
  "/items/super_foraging_tea": ItemDetail;
  "/items/super_intelligence_coffee": ItemDetail;
  "/items/super_magic_coffee": ItemDetail;
  "/items/super_milking_tea": ItemDetail;
  "/items/super_power_coffee": ItemDetail;
  "/items/super_ranged_coffee": ItemDetail;
  "/items/super_stamina_coffee": ItemDetail;
  "/items/super_tailoring_tea": ItemDetail;
  "/items/super_woodcutting_tea": ItemDetail;
  "/items/swamp_essence": ItemDetail;
  "/items/sweep": ItemDetail;
  "/items/swiftness_coffee": ItemDetail;
  "/items/sylvan_aura": ItemDetail;
  "/items/tailoring_essence": ItemDetail;
  "/items/tailoring_tea": ItemDetail;
  "/items/tailors_bottoms": ItemDetail;
  "/items/tailors_top": ItemDetail;
  "/items/task_crystal": ItemDetail;
  "/items/task_token": ItemDetail;
  "/items/taunt": ItemDetail;
  "/items/thread_of_expertise": ItemDetail;
  "/items/tome_of_healing": ItemDetail;
  "/items/tome_of_the_elements": ItemDetail;
  "/items/toughness": ItemDetail;
  "/items/toxic_pollen": ItemDetail;
  "/items/treant_bark": ItemDetail;
  "/items/treant_shield": ItemDetail;
  "/items/turtle_shell": ItemDetail;
  "/items/turtle_shell_body": ItemDetail;
  "/items/turtle_shell_legs": ItemDetail;
  "/items/twilight_essence": ItemDetail;
  "/items/ultra_alchemy_tea": ItemDetail;
  "/items/ultra_attack_coffee": ItemDetail;
  "/items/ultra_brewing_tea": ItemDetail;
  "/items/ultra_cheesesmithing_tea": ItemDetail;
  "/items/ultra_cooking_tea": ItemDetail;
  "/items/ultra_crafting_tea": ItemDetail;
  "/items/ultra_defense_coffee": ItemDetail;
  "/items/ultra_enhancing_tea": ItemDetail;
  "/items/ultra_foraging_tea": ItemDetail;
  "/items/ultra_intelligence_coffee": ItemDetail;
  "/items/ultra_magic_coffee": ItemDetail;
  "/items/ultra_milking_tea": ItemDetail;
  "/items/ultra_power_coffee": ItemDetail;
  "/items/ultra_ranged_coffee": ItemDetail;
  "/items/ultra_stamina_coffee": ItemDetail;
  "/items/ultra_tailoring_tea": ItemDetail;
  "/items/ultra_woodcutting_tea": ItemDetail;
  "/items/umbral_boots": ItemDetail;
  "/items/umbral_bracers": ItemDetail;
  "/items/umbral_chaps": ItemDetail;
  "/items/umbral_hide": ItemDetail;
  "/items/umbral_hood": ItemDetail;
  "/items/umbral_leather": ItemDetail;
  "/items/umbral_tunic": ItemDetail;
  "/items/vampire_fang": ItemDetail;
  "/items/vampire_fang_dirk": ItemDetail;
  "/items/vampiric_bow": ItemDetail;
  "/items/vampirism": ItemDetail;
  "/items/verdant_alembic": ItemDetail;
  "/items/verdant_boots": ItemDetail;
  "/items/verdant_brush": ItemDetail;
  "/items/verdant_buckler": ItemDetail;
  "/items/verdant_bulwark": ItemDetail;
  "/items/verdant_cheese": ItemDetail;
  "/items/verdant_chisel": ItemDetail;
  "/items/verdant_enhancer": ItemDetail;
  "/items/verdant_gauntlets": ItemDetail;
  "/items/verdant_hammer": ItemDetail;
  "/items/verdant_hatchet": ItemDetail;
  "/items/verdant_helmet": ItemDetail;
  "/items/verdant_mace": ItemDetail;
  "/items/verdant_milk": ItemDetail;
  "/items/verdant_needle": ItemDetail;
  "/items/verdant_plate_body": ItemDetail;
  "/items/verdant_plate_legs": ItemDetail;
  "/items/verdant_pot": ItemDetail;
  "/items/verdant_shears": ItemDetail;
  "/items/verdant_spatula": ItemDetail;
  "/items/verdant_spear": ItemDetail;
  "/items/verdant_sword": ItemDetail;
  "/items/vision_helmet": ItemDetail;
  "/items/vision_shield": ItemDetail;
  "/items/watchful_relic": ItemDetail;
  "/items/water_strike": ItemDetail;
  "/items/werewolf_claw": ItemDetail;
  "/items/werewolf_slasher": ItemDetail;
  "/items/wheat": ItemDetail;
  "/items/white_key_fragment": ItemDetail;
  "/items/wisdom_coffee": ItemDetail;
  "/items/wisdom_tea": ItemDetail;
  "/items/wizard_necklace": ItemDetail;
  "/items/woodcutting_essence": ItemDetail;
  "/items/woodcutting_tea": ItemDetail;
  "/items/wooden_bow": ItemDetail;
  "/items/wooden_crossbow": ItemDetail;
  "/items/wooden_fire_staff": ItemDetail;
  "/items/wooden_nature_staff": ItemDetail;
  "/items/wooden_shield": ItemDetail;
  "/items/wooden_water_staff": ItemDetail;
  "/items/yogurt": ItemDetail;
}

export interface ItemDetail {
  hrid: string;
  name: string;
  description: string;
  categoryHrid: CategoryHrid;
  sellPrice: number;
  isTradable: boolean;
  isOpenable: boolean;
  itemLevel: number;
  enhancementCosts: Cost[] | null;
  protectionItemHrids: string[] | null;
  equipmentDetail: EquipmentDetail;
  consumableDetail: ConsumableDetail;
  abilityBookDetail: AbilityBookDetail;
  sortIndex: number;
}

export interface AbilityBookDetail {
  abilityHrid: string;
  levelRequirements: LevelRequirement[] | null;
  experienceGain: number;
}

export enum CategoryHrid {
  ItemCategoriesAbilityBook = "/item_categories/ability_book",
  ItemCategoriesCurrency = "/item_categories/currency",
  ItemCategoriesDrink = "/item_categories/drink",
  ItemCategoriesEquipment = "/item_categories/equipment",
  ItemCategoriesFood = "/item_categories/food",
  ItemCategoriesLoot = "/item_categories/loot",
  ItemCategoriesResource = "/item_categories/resource",
}

export interface ConsumableDetail {
  cooldownDuration: number;
  usableInActionTypeMap: { [key: string]: boolean } | null;
  hitpointRestore: number;
  manapointRestore: number;
  recoveryDuration: number;
  buffs: Buff[] | null;
  defaultCombatTriggers: DefaultCombatTrigger[] | null;
}

export interface EquipmentDetail {
  type: EquipmentDetailType;
  levelRequirements: LevelRequirement[] | null;
  combatStats: Combat;
  noncombatStats: { [key: string]: number };
  combatEnhancementBonuses: Combat;
  noncombatEnhancementBonuses: { [key: string]: number };
}

export enum EquipmentDetailType {
  Empty = "",
  EquipmentTypesBody = "/equipment_types/body",
  EquipmentTypesBrewingTool = "/equipment_types/brewing_tool",
  EquipmentTypesCheesesmithingTool = "/equipment_types/cheesesmithing_tool",
  EquipmentTypesCookingTool = "/equipment_types/cooking_tool",
  EquipmentTypesCraftingTool = "/equipment_types/crafting_tool",
  EquipmentTypesEarrings = "/equipment_types/earrings",
  EquipmentTypesEnhancingTool = "/equipment_types/enhancing_tool",
  EquipmentTypesFeet = "/equipment_types/feet",
  EquipmentTypesForagingTool = "/equipment_types/foraging_tool",
  EquipmentTypesHands = "/equipment_types/hands",
  EquipmentTypesHead = "/equipment_types/head",
  EquipmentTypesLegs = "/equipment_types/legs",
  EquipmentTypesMainHand = "/equipment_types/main_hand",
  EquipmentTypesMilkingTool = "/equipment_types/milking_tool",
  EquipmentTypesNeck = "/equipment_types/neck",
  EquipmentTypesOffHand = "/equipment_types/off_hand",
  EquipmentTypesPouch = "/equipment_types/pouch",
  EquipmentTypesRing = "/equipment_types/ring",
  EquipmentTypesTailoringTool = "/equipment_types/tailoring_tool",
  EquipmentTypesTwoHand = "/equipment_types/two_hand",
  EquipmentTypesWoodcuttingTool = "/equipment_types/woodcutting_tool",
}

export interface BeijingPigeon {
  hrid: string;
  name: string;
  description: string;
  categoryHrid: CategoryHrid;
  sellPrice: number;
  isTradable: boolean;
  isOpenable: boolean;
  itemLevel: number;
  enhancementCosts: Cost[];
  equipmentDetail: EquipmentDetail;
  consumableDetail: ConsumableDetail;
  abilityBookDetail: AbilityBookDetail;
  sortIndex: number;
}

export interface ItemLocationDetailMap {
  hrid: string;
  name: string;
  type: ItemLocationDetailMapType;
  isMultiItem: boolean;
  conflictingOtherItemLocationHrids: string[];
}

export enum ItemLocationDetailMapType {
  ItemLocationTypesEquipment = "/item_location_types/equipment",
  ItemLocationTypesInventory = "/item_location_types/inventory",
}
