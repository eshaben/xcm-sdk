import { TypeRegistry, U128 } from '@polkadot/types';
import { describe, expect, it } from '@jest/globals';
import { AssetMinBuilder } from './AssetMinBuilder';

function balanceOf(number: number | string): U128 {
  return new U128(new TypeRegistry(), number);
}

/**
 * Using snapshot to test bigint values because jest does not support bigint
 */

describe('assetMinBuilder', () => {
  const asset = '<ASSET>';

  describe('assetRegistry', () => {
    describe('assetMetadatas', () => {
      const config = AssetMinBuilder()
        .assetRegistry()
        .assetMetadatas()
        .build({ asset });

      it('should be correct config', () => {
        expect(config).toMatchSnapshot();
      });

      it('should transform correctly', async () => {
        await expect(
          config.transform({
            unwrapOrDefault: () => ({
              minimalBalance: balanceOf(999),
            }),
          }),
        ).resolves.toMatchSnapshot();
      });
    });

    describe('currencyMetadatas', () => {
      const config = AssetMinBuilder()
        .assetRegistry()
        .currencyMetadatas()
        .build({ asset });

      it('should be correct config', () => {
        expect(config).toMatchSnapshot();
      });

      it('should transform correctly', async () => {
        await expect(
          config.transform({
            unwrapOrDefault: () => ({
              minimalBalance: balanceOf(999),
            }),
          }),
        ).resolves.toMatchSnapshot();
      });
    });
  });

  describe('assets', () => {
    describe('asset', () => {
      const config = AssetMinBuilder().assets().asset().build({ asset });

      it('should be correct config', () => {
        expect(config).toMatchSnapshot();
      });

      it('should transform correctly', async () => {
        await expect(
          config.transform({
            unwrapOrDefault: () => ({
              minBalance: balanceOf(999),
            }),
          }),
        ).resolves.toMatchSnapshot();
      });
    });
  });
});
